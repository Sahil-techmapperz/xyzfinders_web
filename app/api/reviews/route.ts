import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/reviews - Create a review
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { reviewed_user_id, product_id, rating, comment } = body;

        // Validation
        if (!reviewed_user_id || !product_id || !rating) {
            return errorResponse('Reviewed user ID, product ID, and rating are required');
        }

        if (rating < 1 || rating > 5) {
            return errorResponse('Rating must be between 1 and 5');
        }

        if (reviewed_user_id === authUser.userId) {
            return errorResponse('Cannot review yourself');
        }

        // Check if already reviewed
        const existing = await query(
            'SELECT * FROM reviews WHERE reviewer_id = ? AND reviewed_user_id = ? AND product_id = ?',
            [authUser.userId, reviewed_user_id, product_id]
        );

        if (existing.length > 0) {
            return errorResponse('You have already reviewed this user for this product');
        }

        // Create review
        const result: any = await query(
            `INSERT INTO reviews (reviewer_id, reviewed_user_id, product_id, rating, comment, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [authUser.userId, reviewed_user_id, product_id, rating, comment || null]
        );

        const reviewId = result.insertId;

        // Update user's rating
        const ratingStats = await query<{ avg_rating: number; total_reviews: number }>(
            'SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM reviews WHERE reviewed_user_id = ?',
            [reviewed_user_id]
        );

        if (ratingStats.length > 0) {
            await query(
                'UPDATE users SET rating = ?, total_reviews = ? WHERE id = ?',
                [ratingStats[0].avg_rating, ratingStats[0].total_reviews, reviewed_user_id]
            );
        }

        // Fetch created review
        const review = await query(
            `SELECT r.*, 
        reviewer.name as reviewer_name,
        reviewed.name as reviewed_user_name,
        p.title as product_title
       FROM reviews r
       LEFT JOIN users reviewer ON r.reviewer_id = reviewer.id
       LEFT JOIN users reviewed ON r.reviewed_user_id = reviewed.id
       LEFT JOIN products p ON r.product_id = p.id
       WHERE r.id = ?`,
            [reviewId]
        );

        return successResponse(review[0], 'Review submitted successfully');
    } catch (error) {
        console.error('Create review error:', error);
        return errorResponse('Failed to create review', 500);
    }
}
