import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/boosts/history - Get boost purchase history
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const boosts = await query(
            `SELECT b.*, p.title as product_title
       FROM boosts b
       LEFT JOIN products p ON b.product_id = p.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
            [authUser.userId]
        );

        return successResponse(boosts);
    } catch (error) {
        console.error('Get boost history error:', error);
        return errorResponse('Failed to fetch boost history', 500);
    }
}
