import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/subscriptions/subscribe - Subscribe to a plan
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { plan_id } = body;

        if (!plan_id) {
            return errorResponse('Plan ID is required');
        }

        // Get plan details
        const plan = await query('SELECT * FROM subscription_plans WHERE id = ?', [plan_id]);
        if (plan.length === 0) {
            return errorResponse('Plan not found');
        }

        // TODO: Process payment

        // Create subscription
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (plan[0].duration_days || 30));

        await query(
            `INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, status, created_at, updated_at)
       VALUES (?, ?, NOW(), ?, 'active', NOW(), NOW())`,
            [authUser.userId, plan_id, endDate]
        );

        return successResponse(null, 'Subscription activated successfully');
    } catch (error) {
        console.error('Subscribe error:', error);
        return errorResponse('Failed to subscribe', 500);
    }
}
