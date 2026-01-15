import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

// GET /api/support/tickets/[id] - Get ticket details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await params;

        const ticket = await queryOne(
            `SELECT t.*, c.name as category_name
       FROM support_tickets t
       LEFT JOIN support_categories c ON t.category_id = c.id
       WHERE t.id = ? AND t.user_id = ?`,
            [id, authUser.userId]
        );

        if (!ticket) {
            return notFoundResponse('Ticket not found');
        }

        // Get replies
        const replies = await query(
            'SELECT * FROM support_replies WHERE ticket_id = ? ORDER BY created_at ASC',
            [id]
        );

        return successResponse({ ...ticket, replies });
    } catch (error) {
        console.error('Get ticket error:', error);
        return errorResponse('Failed to fetch ticket', 500);
    }
}
