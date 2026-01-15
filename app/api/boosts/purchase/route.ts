import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/boosts/purchase - Purchase a boost for a product
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

        // Check if user has active subscription
        const subscription = await query(
            `SELECT * FROM subscriptions 
       WHERE user_id = ? AND status = 'active' AND end_date >= NOW()
       ORDER BY end_date DESC LIMIT 1`,
            [authUser.userId]
        );

        if (subscription.length === 0) {
            return errorResponse('You need to subscribe to a plan to purchase boosts');
        }

        // TODO: Check monthly boost limits based on plan
        // TODO: Process payment ($0.99)

        // Create boost record
        const boostUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

        const result: any = await query(
            `INSERT INTO boosts (user_id, product_id, amount, boost_until, created_at, updated_at)
       VALUES (?, ?, 0.99, ?, NOW(), NOW())`,
            [authUser.userId, product_id, boostUntil]
        );

        // Update product boost status
        await query(
            'UPDATE products SET is_boosted = 1, boost_until = ? WHERE id = ?',
            [boostUntil, product_id]
        );

        return successResponse({
            boost_id: result.insertId,
            product_id,
            boost_until: boostUntil,
            amount_paid: 0.99,
        }, 'Product boosted successfully');
    } catch (error) {
        console.error('Purchase boost error:', error);
        return errorResponse('Failed to purchase boost', 500);
    }
}
