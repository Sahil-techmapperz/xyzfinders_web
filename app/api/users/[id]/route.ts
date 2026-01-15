import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response';

// GET /api/users/[id] - Get public user profile
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const user = await queryOne(
            `SELECT id, name, avatar, rating, total_reviews, created_at
       FROM users WHERE id = ?`,
            [id]
        );

        if (!user) {
            return notFoundResponse('User not found');
        }

        // Get stats
        const stats = await queryOne<{ total_ads: number; active_ads: number }>(
            `SELECT 
        COUNT(*) as total_ads,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_ads
       FROM products WHERE user_id = ?`,
            [id]
        );

        return successResponse({
            ...user,
            total_ads: stats?.total_ads || 0,
            active_ads: stats?.active_ads || 0,
        });
    } catch (error) {
        console.error('Get user error:', error);
        return errorResponse('Failed to fetch user', 500);
    }
}
