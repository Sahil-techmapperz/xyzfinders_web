import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/subscriptions/cancel - Cancel subscription
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Cancel active subscription
        const result: any = await query(
            'UPDATE subscriptions SET status = ?, updated_at = NOW() WHERE user_id = ? AND status = ?',
            ['cancelled', authUser.userId, 'active']
        );

        if (result.affectedRows === 0) {
            return errorResponse('No active subscription found');
        }

        return successResponse(null, 'Subscription cancelled successfully');
    } catch (error) {
        console.error('Cancel subscription error:', error);
        return errorResponse('Failed to cancel subscription', 500);
    }
}
