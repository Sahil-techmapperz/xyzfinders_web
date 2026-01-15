import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/admin/users - Get all users (admin)
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');
        const search = searchParams.get('search');

        let sql = `SELECT id, name, email, phone, role, is_verified, is_banned, created_at
               FROM users
               WHERE 1=1`;
        const params: any[] = [];

        if (search) {
            sql += ' AND (name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        const countSql = sql.replace(/SELECT id.*FROM/, 'SELECT COUNT(*) as total FROM');
        const countResult = await query<{ total: number }>(countSql, params);
        const total = countResult[0]?.total || 0;

        sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(perPage, (page - 1) * perPage);

        const users = await query(sql, params);

        return successResponse({
            users,
            pagination: {
                current_page: page,
                per_page: perPage,
                total,
                total_pages: Math.ceil(total / perPage),
            },
        });
    } catch (error) {
        console.error('Get users error:', error);
        return errorResponse('Failed to fetch users', 500);
    }
}
