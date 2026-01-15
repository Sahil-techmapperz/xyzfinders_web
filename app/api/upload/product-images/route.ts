import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { processUploadedImage } from '@/lib/image-utils';

// POST /api/upload/product-images - Upload product images
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const formData = await request.formData();
        const productId = formData.get('product_id') as string;
        const isPrimary = formData.get('is_primary') === 'true';
        const displayOrder = parseInt(formData.get('display_order') as string || '0');

        if (!productId) {
            return errorResponse('Product ID is required', 400);
        }

        // Verify product ownership
        const product = await query<{ user_id: number }>(
            'SELECT user_id FROM products WHERE id = ?',
            [productId]
        );

        if (!product.length || product[0].user_id !== authUser.userId) {
            return unauthorizedResponse('You can only upload images to your own products');
        }

        // Get all image files from form data
        const images: File[] = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('image') && value instanceof File) {
                images.push(value);
            }
        }

        if (images.length === 0) {
            return errorResponse('No image files provided', 400);
        }

        // Process and upload each image
        const uploadedImages = [];
        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const result = await processUploadedImage(file);

            if (!result.valid) {
                return errorResponse(`Image ${i + 1}: ${result.error}`, 400);
            }

            // If this is marked as primary, unset other primary images
            if (isPrimary && i === 0) {
                await query(
                    'UPDATE product_images SET is_primary = FALSE WHERE product_id = ?',
                    [productId]
                );
            }

            // Insert the image
            const insertResult = await query(
                `INSERT INTO product_images (product_id, image_data, display_order, is_primary)
                 VALUES (?, ?, ?, ?)`,
                [productId, result.buffer, displayOrder + i, isPrimary && i === 0]
            );

            uploadedImages.push({
                size: result.size,
                type: result.mimeType,
                display_order: displayOrder + i
            });
        }

        return successResponse({
            message: `${images.length} image(s) uploaded successfully`,
            images: uploadedImages
        });
    } catch (error) {
        console.error('Product images upload error:', error);
        return errorResponse('Failed to upload product images', 500);
    }
}

// DELETE /api/upload/product-images - Delete product image
export async function DELETE(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const searchParams = request.nextUrl.searchParams;
        const imageId = searchParams.get('image_id');

        if (!imageId) {
            return errorResponse('Image ID is required', 400);
        }

        // Verify ownership through product
        const image = await query<{ product_id: number }>(
            `SELECT pi.product_id 
             FROM product_images pi
             JOIN products p ON pi.product_id = p.id
             WHERE pi.id = ? AND p.user_id = ?`,
            [imageId, authUser.userId]
        );

        if (!image.length) {
            return unauthorizedResponse('Image not found or access denied');
        }

        await query('DELETE FROM product_images WHERE id = ?', [imageId]);

        return successResponse({
            message: 'Product image deleted successfully'
        });
    } catch (error) {
        console.error('Product image delete error:', error);
        return errorResponse('Failed to delete product image', 500);
    }
}
