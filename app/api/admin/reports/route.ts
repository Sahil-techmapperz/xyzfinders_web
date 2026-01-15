import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, paginatedResponse } from '@/lib/api-response';

// GET /api/admin/reports - Get all reports (admin)
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');
        const status = searchParams.get('status') || 'pending';

        const reports = await query(
            `SELECT r.*, p.title as product_title, u.name as reporter_name
       FROM reports r
       LEFT JOIN products p ON r.product_id = p.id
       LEFT JOIN users u ON r.reporter_id = u.id
       WHERE r.status = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
            [status, perPage, (page - 1) * perPage]
        );

        const countResult = await query<{ total: number }>(
            'SELECT COUNT(*) as total FROM reports WHERE status = ?',
            [status]
        );
        const total = countResult[0]?.total || 0;

        return paginatedResponse(reports, page, perPage, total);
    } catch (error) {
        console.error('Get reports error:', error);
        return errorResponse('Failed to fetch reports', 500);
    }
}
