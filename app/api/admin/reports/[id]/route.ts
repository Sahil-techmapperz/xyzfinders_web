import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// PUT /api/admin/reports/[id] - Update report status
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
        const { status, action } = body;

        // Update report status
        await query(
            'UPDATE reports SET status = ?, admin_action = ?, updated_at = NOW() WHERE id = ?',
            [status, action || null, id]
        );

        return successResponse(null, 'Report updated successfully');
    } catch (error) {
        console.error('Update report error:', error);
        return errorResponse('Failed to update report', 500);
    }
}
