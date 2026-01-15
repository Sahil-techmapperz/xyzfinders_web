import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/support/tickets/[id]/close - Close ticket
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

        // Update ticket status
        const result: any = await query(
            'UPDATE support_tickets SET status = ? WHERE id = ? AND user_id = ?',
            ['closed', id, authUser.userId]
        );

        if (result.affectedRows === 0) {
            return errorResponse('Ticket not found or unauthorized');
        }

        return successResponse(null, 'Ticket closed successfully');
    } catch (error) {
        console.error('Close ticket error:', error);
        return errorResponse('Failed to close ticket', 500);
    }
}
