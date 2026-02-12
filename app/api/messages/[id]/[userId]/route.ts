import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/messages/[id]/[userId] - Get messages in a conversation
// Note: [id] here represents productId, renamed to avoid conflict with messages/[id]/read
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; userId: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id: productId, userId } = await params;

        // Get messages between current user and the other user for this product
        const messages = await query(
            `SELECT m.*,
        sender.name as sender_name,
        receiver.name as receiver_name
       FROM messages m
       LEFT JOIN users sender ON m.sender_id = sender.id
       LEFT JOIN users receiver ON m.receiver_id = receiver.id
       WHERE m.product_id = ?
       AND ((m.sender_id = ? AND m.receiver_id = ?)
            OR (m.sender_id = ? AND m.receiver_id = ?))
       ORDER BY m.created_at ASC`,
            [productId, authUser.userId, userId, userId, authUser.userId]
        );

        // Mark messages as read
        await query(
            `UPDATE messages 
       SET is_read = 1 
       WHERE product_id = ? 
       AND receiver_id = ? 
       AND sender_id = ?
       AND is_read = 0`,
            [productId, authUser.userId, userId]
        );

        return successResponse(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        return errorResponse('Failed to fetch messages', 500);
    }
}
