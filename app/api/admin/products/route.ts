import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, paginatedResponse } from '@/lib/api-response';

// GET /api/admin/products - Get all products (admin only)
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');
        const status = searchParams.get('status');

        let sql = `SELECT p.*, u.name as seller_name, c.name as category_name
               FROM products p
               LEFT JOIN users u ON p.user_id = u.id
               LEFT JOIN categories c ON p.category_id = c.id
               WHERE 1=1`;
        const params: any[] = [];

        if (status) {
            sql += ' AND p.status = ?';
            params.push(status);
        }

        const countSql = sql.replace(/SELECT p\.\*.*FROM/, 'SELECT COUNT(*) as total FROM');
        const countResult = await query<{ total: number }>(countSql, params);
        const total = countResult[0]?.total || 0;

        sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        params.push(perPage, (page - 1) * perPage);

        const products = await query(sql, params);

        return paginatedResponse(products, page, perPage, total);
    } catch (error) {
        console.error('Admin get products error:', error);
        return errorResponse('Failed to fetch products', 500);
    }
}
