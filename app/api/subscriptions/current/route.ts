import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/subscriptions/current - Get current user's subscription
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Get active subscription
        const subscription = await queryOne(
            `SELECT s.*, p.name as plan_name, p.features
       FROM subscriptions s
       LEFT JOIN subscription_plans p ON s.plan_id = p.id
       WHERE s.user_id = ? 
       AND s.status = 'active'
       AND s.end_date >= NOW()
       ORDER BY s.end_date DESC
       LIMIT 1`,
            [authUser.userId]
        );

        if (!subscription) {
            return successResponse({
                has_subscription: false,
                subscription: null,
            });
        }

        // Get usage stats
        const activeAds = await query<{ count: number }>(
            `SELECT COUNT(*) as count FROM products 
       WHERE user_id = ? AND status = 'active'`,
            [authUser.userId]
        );

        return successResponse({
            has_subscription: true,
            subscription,
            limits: {
                active_ads: activeAds[0]?.count || 0,
                max_active_ads: subscription.features?.max_active_ads || 5,
            },
        });
    } catch (error) {
        console.error('Get subscription error:', error);
        return errorResponse('Failed to fetch subscription', 500);
    }
}
