import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/locations - Get locations with optional city filter
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const city_id = searchParams.get('city_id');

        let sql = `SELECT l.*, c.name as city_name, s.name as state_name
               FROM locations l
               LEFT JOIN cities c ON l.city_id = c.id
               LEFT JOIN states s ON c.state_id = s.id
               WHERE 1=1`;
        const params: any[] = [];

        if (city_id) {
            sql += ' AND l.city_id = ?';
            params.push(city_id);
        }

        sql += ' ORDER BY l.name ASC';

        const locations = await query(sql, params);

        return successResponse(locations);
    } catch (error) {
        console.error('Get locations error:', error);
        return errorResponse('Failed to fetch locations', 500);
    }
}
