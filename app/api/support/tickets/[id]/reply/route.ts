import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/support/tickets/[id]/reply - Reply to ticket
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await params;
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return errorResponse('Message is required');
        }

        // Verify ticket belongs to user
        const ticket = await query(
            'SELECT * FROM support_tickets WHERE id = ? AND user_id = ?',
            [id, authUser.userId]
        );

        if (ticket.length === 0) {
            return errorResponse('Ticket not found or unauthorized');
        }

        // Add reply
        await query(
            `INSERT INTO support_replies (ticket_id, user_id, message, is_admin, created_at)
       VALUES (?, ?, ?, 0, NOW())`,
            [id, authUser.userId, message]
        );

        // Update ticket updated_at
        await query(
            'UPDATE support_tickets SET updated_at = NOW() WHERE id = ?',
            [id]
        );

        return successResponse(null, 'Reply added successfully');
    } catch (error) {
        console.error('Reply to ticket error:', error);
        return errorResponse('Failed to add reply', 500);
    }
}
