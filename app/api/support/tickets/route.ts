import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, paginatedResponse } from '@/lib/api-response';

// GET /api/support/tickets - Get user's support tickets
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');

        const tickets = await query(
            `SELECT t.*, c.name as category_name
       FROM support_tickets t
       LEFT JOIN support_categories c ON t.category_id = c.id
       WHERE t.user_id = ?
       ORDER BY t.created_at DESC
       LIMIT ? OFFSET ?`,
            [authUser.userId, perPage, (page - 1) * perPage]
        );

        const countResult = await query<{ total: number }>(
            'SELECT COUNT(*) as total FROM support_tickets WHERE user_id = ?',
            [authUser.userId]
        );
        const total = countResult[0]?.total || 0;

        return paginatedResponse(tickets, page, perPage, total);
    } catch (error) {
        console.error('Get tickets error:', error);
        return errorResponse('Failed to fetch tickets', 500);
    }
}

// POST /api/support/tickets - Create support ticket
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { category_id, subject, message } = body;

        if (!category_id || !subject || !message) {
            return errorResponse('All fields are required');
        }

        // Create ticket
        const result: any = await query(
            `INSERT INTO support_tickets (user_id, category_id, subject, message, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'open', NOW(), NOW())`,
            [authUser.userId, category_id, subject, message]
        );

        return successResponse(
            { id: result.insertId },
            'Support ticket created successfully. Our team will respond soon.'
        );
    } catch (error) {
        console.error('Create ticket error:', error);
        return errorResponse('Failed to create support ticket', 500);
    }
}
