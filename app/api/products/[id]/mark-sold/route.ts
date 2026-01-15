import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

// POST /api/products/[id]/mark-sold - Mark product as sold
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id: productId } = await params;

        // Check if product exists and belongs to user
        const product = await query(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        if (product.length === 0) {
            return notFoundResponse('Product not found');
        }

        if (product[0].user_id !== authUser.userId) {
            return unauthorizedResponse('You do not own this product');
        }

        // Mark as sold
        await query(
            `UPDATE products SET status = 'sold', updated_at = NOW() WHERE id = ?`,
            [productId]
        );

        return successResponse(null, 'Product marked as sold');
    } catch (error) {
        console.error('Mark sold error:', error);
        return errorResponse('Failed to mark product as sold', 500);
    }
}
