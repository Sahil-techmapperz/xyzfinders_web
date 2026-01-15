import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// PUT /api/admin/users/[id] - Update user (admin)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const { id } = await params;
        const body = await request.json();
        const { role, is_verified, is_banned } = body;

        await query(
            `UPDATE users SET 
        role = COALESCE(?, role),
        is_verified = COALESCE(?, is_verified),
        is_banned = COALESCE(?, is_banned),
        updated_at = NOW()
       WHERE id = ?`,
            [role, is_verified, is_banned, id]
        );

        return successResponse(null, 'User updated successfully');
    } catch (error) {
        console.error('Update user error:', error);
        return errorResponse('Failed to update user', 500);
    }
}

// POST /api/admin/users/[id]/ban - Ban/unban user
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const { id } = await params;
        const body = await request.json();
        const { is_banned, reason } = body;

        await query(
            'UPDATE users SET is_banned = ?, ban_reason = ?, updated_at = NOW() WHERE id = ?',
            [is_banned ? 1 : 0, reason || null, id]
        );

        return successResponse(null, is_banned ? 'User banned successfully' : 'User unbanned successfully');
    } catch (error) {
        console.error('Ban user error:', error);
        return errorResponse('Failed to update user status', 500);
    }
}
