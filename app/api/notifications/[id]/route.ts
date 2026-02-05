import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// PUT /api/notifications/[id] - Mark as read
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await params;

        // Verify ownership
        const [existing] = await query('SELECT receiver_id FROM notifications WHERE id = ?', [id]);
        if (!existing) {
            return errorResponse('Notification not found', 404);
        }
        if (existing.receiver_id !== authUser.userId) {
            return unauthorizedResponse();
        }

        await query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id]);

        return successResponse({ message: 'Marked as read' });
    } catch (error) {
        console.error('Update notification error:', error);
        return errorResponse('Failed to update notification', 500);
    }
}

// DELETE /api/notifications/[id] - Delete notification
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await params;

        const [existing] = await query('SELECT receiver_id FROM notifications WHERE id = ?', [id]);
        if (!existing) {
            return errorResponse('Notification not found', 404);
        }
        if (existing.receiver_id !== authUser.userId) {
            return unauthorizedResponse();
        }

        await query('DELETE FROM notifications WHERE id = ?', [id]);

        return successResponse({ message: 'Notification deleted' });
    } catch (error) {
        console.error('Delete notification error:', error);
        return errorResponse('Failed to delete notification', 500);
    }
}
