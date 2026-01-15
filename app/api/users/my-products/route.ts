import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, paginatedResponse } from '@/lib/api-response';

// GET /api/users/my-products - Get current user's products
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const searchParams = request.nextUrl.searchParams;
        const page = Number(searchParams.get('page')) || 1;
        const perPage = Number(searchParams.get('per_page')) || 20;
        const status = searchParams.get('status');

        // Base FROM and WHERE clauses
        let baseSql = `
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN locations l ON p.location_id = l.id
      WHERE p.user_id = ?
    `;
        const baseParams: any[] = [authUser.userId];

        if (status) {
            baseSql += ' AND p.status = ?';
            baseParams.push(status);
        }

        // Count total
        const countSql = `SELECT COUNT(*) as total ${baseSql}`;
        const countResult = await query<{ total: number }>(countSql, baseParams);
        const total = countResult[0]?.total || 0;

        // Select data
        let sql = `
      SELECT p.*, c.name as category_name, l.name as city,
       (SELECT id FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, id ASC LIMIT 1) as primary_image_id
       ${baseSql}
    `;

        // Add pagination
        const limit = Number(perPage);
        const offset = Number((page - 1) * perPage);

        // Use string interpolation for LIMIT/OFFSET
        sql += ` ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

        const products = await query(sql, baseParams);

        return paginatedResponse(products, page, perPage, total);
    } catch (error) {
        console.error('Get my products error:', error);
        return errorResponse('Failed to fetch products', 500);
    }
}
