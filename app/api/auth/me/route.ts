import { NextRequest } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { queryOne } from '@/lib/db';
import { successResponse, unauthorizedResponse, errorResponse } from '@/lib/api-response';
import { User } from '@/types';

export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);

        if (!authUser) {
            return unauthorizedResponse();
        }

        // Fetch user details
        const user = await queryOne<User>(
            'SELECT id, name, email, phone, user_type, is_verified, created_at, updated_at FROM users WHERE id = ?',
            [authUser.userId]
        );

        if (!user) {
            return unauthorizedResponse('User not found');
        }

        return successResponse(user);
    } catch (error) {
        console.error('Get user error:', error);
        return errorResponse('Failed to get user details', 500);
    }
}
