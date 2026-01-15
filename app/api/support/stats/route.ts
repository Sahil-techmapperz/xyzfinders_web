import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/support/stats - Get support statistics (admin only)
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.role !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const openTickets = await query<{ count: number }>(
            "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'open'"
        );

        const closedTickets = await query<{ count: number }>(
            "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'closed'"
        );

        const pendingTickets = await query<{ count: number }>(
            "SELECT COUNT(*) as count FROM support_tickets WHERE status = 'pending'"
        );

        const totalMessages = await query<{ count: number }>(
            'SELECT COUNT(*) as count FROM contact_messages'
        );

        return successResponse({
            open_tickets: openTickets[0]?.count || 0,
            closed_tickets: closedTickets[0]?.count || 0,
            pending_tickets: pendingTickets[0]?.count || 0,
            total_contact_messages: totalMessages[0]?.count || 0,
        });
    } catch (error) {
        console.error('Get support stats error:', error);
        return errorResponse('Failed to fetch support statistics', 500);
    }
}
