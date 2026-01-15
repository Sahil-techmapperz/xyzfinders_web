import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/api-response';

// GET /api/users/[id]/reviews - Get user reviews
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');

        const { id: userId } = await params;

        // Get overall stats
        const stats = await query<{ avg_rating: number; total_reviews: number }>(
            'SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM reviews WHERE reviewed_user_id = ?',
            [userId]
        );

        // Get reviews with pagination
        const reviews = await query(
            `SELECT r.*, 
        reviewer.name as reviewer_name,
        reviewer.avatar as reviewer_avatar,
        p.title as product_title
       FROM reviews r
       LEFT JOIN users reviewer ON r.reviewer_id = reviewer.id
       LEFT JOIN products p ON r.product_id = p.id
       WHERE r.reviewed_user_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
            [userId, perPage, (page - 1) * perPage]
        );

        const total = stats[0]?.total_reviews || 0;

        return successResponse({
            overall_rating: stats[0]?.avg_rating || 0,
            total_reviews: total,
            reviews,
            pagination: {
                current_page: page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        });
    } catch (error) {
        console.error('Get user reviews error:', error);
        return errorResponse('Failed to fetch reviews', 500);
    }
}
