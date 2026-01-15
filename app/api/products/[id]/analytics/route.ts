import { NextRequest } from 'next/server';
import { queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

// GET /api/products/[id]/analytics - Get product analytics
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await params;

        // Check if product belongs to user
        const product = await queryOne(
            'SELECT * FROM products WHERE id = ? AND user_id = ?',
            [id, authUser.userId]
        );

        if (!product) {
            return notFoundResponse('Product not found or unauthorized');
        }

        // Get analytics data
        const analytics = {
            views: product.views || 0,
            favorites: await queryOne<{ count: number }>(
                'SELECT COUNT(*) as count FROM favorites WHERE product_id = ?',
                [id]
            ),
            messages: await queryOne<{ count: number }>(
                'SELECT COUNT(DISTINCT sender_id) as count FROM messages WHERE product_id = ?',
                [id]
            ),
            // TODO: Add more analytics like daily views, conversion rate, etc.
        };

        return successResponse({
            product_id: id,
            total_views: analytics.views,
            total_favorites: analytics.favorites?.count || 0,
            total_inquiries: analytics.messages?.count || 0,
        });
    } catch (error) {
        console.error('Get product analytics error:', error);
        return errorResponse('Failed to fetch analytics', 500);
    }
}
