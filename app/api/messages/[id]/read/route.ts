import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// PUT /api/messages/[id]/read - Mark message as read
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

        // Update message
        const result: any = await query(
            'UPDATE messages SET is_read = 1, updated_at = NOW() WHERE id = ? AND receiver_id = ?',
            [id, authUser.userId]
        );

        if (result.affectedRows === 0) {
            return errorResponse('Message not found or unauthorized');
        }

        return successResponse(null, 'Message marked as read');
    } catch (error) {
        console.error('Mark message read error:', error);
        return errorResponse('Failed to mark message as read', 500);
    }
}
