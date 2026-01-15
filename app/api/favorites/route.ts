import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/favorites - Get user's favorites
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const favorites = await query(
            `SELECT f.*, p.title, p.price, p.status
       FROM favorites f
       JOIN products p ON f.product_id = p.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
            [authUser.userId]
        );

        // Fetch images for all favorited products
        if (favorites.length > 0) {
            const productIds = favorites.map((f: any) => f.product_id);
            const placeholders = productIds.map(() => '?').join(',');

            const allImages = await query<{
                product_id: number;
                id: number;
                image_data: Buffer;
                display_order: number;
                is_primary: boolean;
            }>(
                `SELECT product_id, id, image_data, display_order, is_primary 
                 FROM product_images 
                 WHERE product_id IN (${placeholders})
                 ORDER BY product_id, is_primary DESC, display_order ASC`,
                productIds
            );

            // Group images by product_id and convert to base64
            const imagesByProduct = allImages.reduce((acc, img) => {
                if (!acc[img.product_id]) {
                    acc[img.product_id] = [];
                }
                acc[img.product_id].push({
                    id: img.id,
                    image: img.image_data.toString('base64'),
                    display_order: img.display_order,
                    is_primary: img.is_primary
                });
                return acc;
            }, {} as Record<number, any[]>);

            // Attach images to each favorite
            favorites.forEach((favorite: any) => {
                favorite.images = imagesByProduct[favorite.product_id] || [];
            });
        }

        return successResponse(favorites);
    } catch (error) {
        console.error('Get favorites error:', error);
        return errorResponse('Failed to fetch favorites', 500);
    }
}

// POST /api/favorites - Add to favorites
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { product_id } = body;

        if (!product_id) {
            return errorResponse('Product ID is required');
        }

        // Check if already favorited
        const existing = await query(
            'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
            [authUser.userId, product_id]
        );

        if (existing.length > 0) {
            return errorResponse('Product already in favorites');
        }

        // Add to favorites
        await query(
            'INSERT INTO favorites (user_id, product_id, created_at) VALUES (?, ?, NOW())',
            [authUser.userId, product_id]
        );

        return successResponse(null, 'Added to favorites');
    } catch (error) {
        console.error('Add favorite error:', error);
        return errorResponse('Failed to add to favorites', 500);
    }
}
