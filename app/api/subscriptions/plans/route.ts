import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/subscriptions/plans - Get all subscription plans
export async function GET(request: NextRequest) {
    try {
        const plans = await query(
            `SELECT * FROM subscription_plans ORDER BY price ASC`
        );

        return successResponse(plans);
    } catch (error) {
        console.error('Get plans error:', error);
        return errorResponse('Failed to fetch subscription plans', 500);
    }
}
