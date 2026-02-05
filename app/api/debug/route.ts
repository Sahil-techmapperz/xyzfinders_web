import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
    try {
        // Count total products
        const totalResult = await query<{ total: number }>('SELECT COUNT(*) as total FROM products');
        const total = totalResult[0]?.total || 0;

        // Get sample products
        const products = await query('SELECT id, title, status, category_id, location_id FROM products LIMIT 10');

        // Get categories
        const categories = await query('SELECT id, name FROM categories');

        return successResponse({
            total_products: total,
            sample_products: products,
            categories: categories
        });
    } catch (error) {
        console.error('Debug error:', error);
        return errorResponse(`Failed to debug: ${error}`, 500);
    }
}
