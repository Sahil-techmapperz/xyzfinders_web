import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/locations/states - Get all states
export async function GET(request: NextRequest) {
    try {
        const states = await query<{ state: string }>(
            'SELECT DISTINCT state FROM locations ORDER BY state ASC'
        );

        return successResponse(states);
    } catch (error) {
        console.error('Get states error:', error);
        return errorResponse('Failed to fetch states', 500);
    }
}
