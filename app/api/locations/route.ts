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

// POST /api/locations - Create or find location
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { city, state, name } = body;

        if (!city || !state) {
            return errorResponse('City and state are required');
        }

        const locationName = name || city;

        // Find or create state
        let stateRecord = await queryOne<{ id: number; name: string }>(
            'SELECT * FROM states WHERE name = ? LIMIT 1',
            [state]
        );

        if (!stateRecord) {
            const result: any = await query(
                'INSERT INTO states (name, created_at) VALUES (?, NOW())',
                [state]
            );
            stateRecord = await queryOne<{ id: number; name: string }>(
                'SELECT * FROM states WHERE id = ?',
                [result.insertId]
            );
        }

        const stateId = stateRecord!.id;

        // Find or create city
        let cityRecord = await queryOne<{ id: number; state_id: number; name: string }>(
            'SELECT * FROM cities WHERE state_id = ? AND name = ? LIMIT 1',
            [stateId, city]
        );

        if (!cityRecord) {
            const result: any = await query(
                'INSERT INTO cities (state_id, name, created_at) VALUES (?, ?, NOW())',
                [stateId, city]
            );
            cityRecord = await queryOne<{ id: number; state_id: number; name: string }>(
                'SELECT * FROM cities WHERE id = ?',
                [result.insertId]
            );
        }

        const cityId = cityRecord!.id;

        // Find or create location
        let locationRecord = await queryOne<{ id: number; city_id: number; name: string }>(
            'SELECT * FROM locations WHERE city_id = ? AND name = ? LIMIT 1',
            [cityId, locationName]
        );

        if (!locationRecord) {
            const result: any = await query(
                'INSERT INTO locations (city_id, name, created_at) VALUES (?, ?, NOW())',
                [cityId, locationName]
            );
            locationRecord = await queryOne<{ id: number; city_id: number; name: string }>(
                'SELECT * FROM locations WHERE id = ?',
                [result.insertId]
            );
        }

        return successResponse(locationRecord);
    } catch (error) {
        console.error('Create location error:', error);
        return errorResponse('Failed to create location', 500);
    }
}
