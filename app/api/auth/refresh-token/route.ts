import { NextRequest } from 'next/server';
import { getUserFromRequest, signToken } from '@/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/lib/api-response';

// POST /api/auth/refresh-token
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);

        if (!authUser) {
            return unauthorizedResponse();
        }

        // Generate new token
        const newToken = signToken({
            userId: authUser.userId,
            email: authUser.email,
            user_type: authUser.user_type,
        });

        return successResponse({ token: newToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        return errorResponse('Failed to refresh token', 500);
    }
}
