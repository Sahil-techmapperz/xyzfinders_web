import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/users/profile - Get user profile
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const profile = await query(
            `SELECT id, name, email, phone, role, avatar, is_verified, created_at, updated_at
       FROM users WHERE id = ?`,
            [authUser.userId]
        );

        if (profile.length === 0) {
            return errorResponse('Profile not found', 404);
        }

        return successResponse(profile[0]);
    } catch (error) {
        console.error('Get profile error:', error);
        return errorResponse('Failed to fetch profile', 500);
    }
}

// PUT /api/users/profile - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { name, phone, avatar } = body;

        await query(
            `UPDATE users SET 
        name = COALESCE(?, name),
        phone = COALESCE(?, phone),
        avatar = COALESCE(?, avatar),
        updated_at = NOW()
       WHERE id = ?`,
            [name, phone, avatar, authUser.userId]
        );

        const updatedProfile = await query(
            'SELECT id, name, email, phone, role, avatar, is_verified, created_at, updated_at FROM users WHERE id = ?',
            [authUser.userId]
        );

        return successResponse(updatedProfile[0], 'Profile updated successfully');
    } catch (error) {
        console.error('Update profile error:', error);
        return errorResponse('Failed to update profile', 500);
    }
}
