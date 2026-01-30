import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/seller/products - Get all products for the authenticated seller
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Fetch products with category name and primary thumbnail
        // Note: Using a subquery for the thumbnail. Stored as BLOB, so we just get it.
        const products = await query<any>(
            `SELECT 
                p.id, p.title, p.price, p.status, p.views as views_count, 
                (SELECT COUNT(*) FROM favorites WHERE product_id = p.id) as favorites_count,
                p.created_at,
                c.name as category_name,
                (SELECT image_data FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, display_order ASC LIMIT 1) as thumbnail_blob
             FROM products p 
             LEFT JOIN categories c ON p.category_id = c.id 
             WHERE p.user_id = ? 
             ORDER BY p.created_at DESC`,
            [authUser.userId]
        );

        // Process products to convert BLOB to Base64 string for the frontend
        const processedProducts = products.map(product => {
            let thumbnail = '/images/placeholder.jpg';

            if (product.thumbnail_blob) {
                // Convert buffer to base64
                const base64 = Buffer.from(product.thumbnail_blob).toString('base64');
                thumbnail = `data:image/jpeg;base64,${base64}`;
            }

            // Remove the raw blob from the response to save bandwidth/confusion
            const { thumbnail_blob, ...rest } = product;

            return {
                ...rest,
                thumbnail
            };
        });

        return successResponse(processedProducts);
    } catch (error: any) {
        console.error('Fetch seller products error:', error);
        return errorResponse('Failed to fetch products: ' + error.message, 500);
    }
}
