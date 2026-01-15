import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// GET /api/support/categories - Get support categories
export async function GET(request: NextRequest) {
    try {
        const categories = await query(
            'SELECT * FROM support_categories ORDER BY display_order ASC'
        );

        return successResponse(categories);
    } catch (error) {
        console.error('Get support categories error:', error);
        return errorResponse('Failed to fetch support categories', 500);
    }
}
