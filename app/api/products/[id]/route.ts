import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, notFoundResponse, unauthorizedResponse } from '@/lib/api-response';
import { Product } from '@/types';

// GET /api/products/[id] - Get single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: productId } = await params;

        const product = await queryOne<Product>(
            `SELECT p.*, 
        u.name as seller_name, u.phone as seller_phone,
        c.name as category_name,
        l.name as city,
        ci.name as city_name,
        s.name as state
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN locations l ON p.location_id = l.id
      LEFT JOIN cities ci ON l.city_id = ci.id
      LEFT JOIN states s ON ci.state_id = s.id
      WHERE p.id = ?`,
            [productId]
        );

        if (!product) {
            return notFoundResponse('Product not found');
        }

        // Fetch product images
        const images = await query<{
            id: number;
            image_data: Buffer;
            display_order: number;
            is_primary: boolean;
        }>(
            `SELECT id, image_data, display_order, is_primary 
             FROM product_images 
             WHERE product_id = ? 
             ORDER BY is_primary DESC, display_order ASC`,
            [productId]
        );

        // Convert image binary data to base64
        const productImages = images.map(img => ({
            id: img.id,
            image: img.image_data.toString('base64'),
            display_order: img.display_order,
            is_primary: img.is_primary
        }));

        // Increment view count
        await query('UPDATE products SET views = views + 1 WHERE id = ?', [productId]);

        // Fetch similar products (same category, excluding current product)
        const similarProducts = await query<Product>(
            `SELECT p.id, p.title, p.price, p.location_id, p.user_id, p.product_attributes,
             l.name as city, u.name as seller_name
             FROM products p
             LEFT JOIN locations l ON p.location_id = l.id
             LEFT JOIN users u ON p.user_id = u.id
             WHERE p.category_id = ? AND p.id != ?
             LIMIT 5`,
            [product.category_id, productId]
        );

        // Fetch images for similar products
        const similarProductsWithImages = await Promise.all(similarProducts.map(async (p) => {
            const result = await query<{ image_data: Buffer }>(
                'SELECT image_data FROM product_images WHERE product_id = ? ORDER BY is_primary DESC LIMIT 1',
                [p.id]
            );
            return {
                ...p,
                image: result.length > 0 ? result[0].image_data.toString('base64') : null
            };
        }));

        return successResponse({
            ...product,
            images: productImages,
            similarProducts: similarProductsWithImages
        });
    } catch (error) {
        console.error('Get product error:', error);
        return errorResponse('Failed to fetch product', 500);
    }
}

// PUT /api/products/[id] - Update product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id: productId } = await params;
        const body = await request.json();

        // Check if product exists and belongs to user
        const product = await queryOne<Product>(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        if (!product) {
            return notFoundResponse('Product not found');
        }

        if (product.user_id !== authUser.userId && authUser.user_type !== 'admin') {
            return unauthorizedResponse('You do not have permission to update this product');
        }

        const {
            title,
            description,
            price,
            original_price,
            category_id,
            location_id,
            images,
            condition,
            status,
        } = body;

        // Update product
        await query(
            `UPDATE products SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        original_price = ?,
        category_id = COALESCE(?, category_id),
        location_id = COALESCE(?, location_id),
        images = COALESCE(?, images),
        \`condition\` = COALESCE(?, \`condition\`),
        status = COALESCE(?, status),
        updated_at = NOW()
      WHERE id = ?`,
            [
                title,
                description,
                price,
                original_price,
                category_id,
                location_id,
                images ? JSON.stringify(images) : null,
                condition,
                status,
                productId,
            ]
        );

        // Fetch updated product
        const updatedProduct = await queryOne<Product>(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        return successResponse(updatedProduct, 'Product updated successfully');
    } catch (error) {
        console.error('Update product error:', error);
        return errorResponse('Failed to update product', 500);
    }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id: productId } = await params;

        // Check if product exists and belongs to user
        const product = await queryOne<Product>(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        if (!product) {
            return notFoundResponse('Product not found');
        }

        if (product.user_id !== authUser.userId && authUser.user_type !== 'admin') {
            return unauthorizedResponse('You do not have permission to delete this product');
        }

        // Delete product
        await query('DELETE FROM products WHERE id = ?', [productId]);

        return successResponse(null, 'Product deleted successfully');
    } catch (error) {
        console.error('Delete product error:', error);
        return errorResponse('Failed to delete product', 500);
    }
}
