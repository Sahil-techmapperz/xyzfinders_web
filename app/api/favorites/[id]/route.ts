import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// DELETE /api/favorites/[id] - Remove from favorites
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id: favoriteId } = await params;

        // Delete favorite
        const result: any = await query(
            'DELETE FROM favorites WHERE id = ? AND user_id = ?',
            [favoriteId, authUser.userId]
        );

        if (result.affectedRows === 0) {
            return errorResponse('Favorite not found or unauthorized');
        }

        return successResponse(null, 'Removed from favorites');
    } catch (error) {
        console.error('Remove favorite error:', error);
        return errorResponse('Failed to remove from favorites', 500);
    }
}
