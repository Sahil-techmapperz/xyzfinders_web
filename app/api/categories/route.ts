import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import { Category } from '@/types';

// GET /api/categories - List all categories
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const parent_id = searchParams.get('parent_id');
        const featured = searchParams.get('featured');

        let sql = 'SELECT * FROM categories WHERE 1=1';
        const params: any[] = [];

        if (parent_id) {
            sql += ' AND parent_id = ?';
            params.push(parent_id);
        } else if (parent_id === null) {
            sql += ' AND parent_id IS NULL';
        }

        if (featured === 'true') {
            sql += ' AND is_featured = 1';
        }

        sql += ' ORDER BY name ASC';

        const categories = await query<Category>(sql, params);

        return successResponse(categories);
    } catch (error) {
        console.error('Categories list error:', error);
        return errorResponse('Failed to fetch categories', 500);
    }
}
