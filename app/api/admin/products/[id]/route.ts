import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// PUT /api/admin/products/[id]/feature - Feature/unfeature product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const body = await request.json();
        const { is_featured } = body;

        await query(
            'UPDATE products SET is_featured = ?, updated_at = NOW() WHERE id = ?',
            [is_featured ? 1 : 0, id]
        );

        return successResponse(null, is_featured ? 'Product featured successfully' : 'Product unfeatured successfully');
    } catch (error) {
        console.error('Feature product error:', error);
        return errorResponse('Failed to update product', 500);
    }
}

// DELETE /api/admin/products/[id] - Delete product (admin)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        await query('DELETE FROM products WHERE id = ?', [id]);

        return successResponse(null, 'Product deleted successfully');
    } catch (error) {
        console.error('Delete product error:', error);
        return errorResponse('Failed to delete product', 500);
    }
}
