import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/subscriptions/history - Get subscription history
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const subscriptions = await query(
            `SELECT s.*, p.name as plan_name, p.price
       FROM subscriptions s
       LEFT JOIN subscription_plans p ON s.plan_id = p.id
       WHERE s.user_id = ?
       ORDER BY s.created_at DESC`,
            [authUser.userId]
        );

        return successResponse(subscriptions);
    } catch (error) {
        console.error('Get subscription history error:', error);
        return errorResponse('Failed to fetch subscription history', 500);
    }
}
