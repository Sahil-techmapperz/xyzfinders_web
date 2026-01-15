import { NextRequest } from 'next/server';
import { queryOne } from '@/lib/db';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response';
import { Category } from '@/types';

// GET /api/categories/[id] - Get single category
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: categoryId } = await params;

        const category = await queryOne<Category>(
            'SELECT * FROM categories WHERE id = ?',
            [categoryId]
        );

        if (!category) {
            return notFoundResponse('Category not found');
        }

        return successResponse(category);
    } catch (error) {
        console.error('Get category error:', error);
        return errorResponse('Failed to fetch category', 500);
    }
}
