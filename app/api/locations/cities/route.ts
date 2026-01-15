import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import { Location } from '@/types';

// GET /api/locations/cities - Get cities (optionally filtered by state)
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const state = searchParams.get('state');

        let sql = 'SELECT * FROM locations';
        const params: any[] = [];

        if (state) {
            sql += ' WHERE state = ?';
            params.push(state);
        }

        sql += ' ORDER BY city ASC';

        const cities = await query<Location>(sql, params);

        return successResponse(cities);
    } catch (error) {
        console.error('Get cities error:', error);
        return errorResponse('Failed to fetch cities', 500);
    }
}
