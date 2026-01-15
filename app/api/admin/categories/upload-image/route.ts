import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { processUploadedImage } from '@/lib/image-utils';

// POST /api/admin/categories/upload-image - Upload category image/icon (Admin only)
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const formData = await request.formData();
        const categoryId = formData.get('category_id') as string;
        const imageType = formData.get('type') as string; // 'image' or 'icon'
        const file = formData.get('file') as File;

        if (!categoryId) {
            return errorResponse('Category ID is required', 400);
        }

        if (!file) {
            return errorResponse('No image file provided', 400);
        }

        if (imageType !== 'image' && imageType !== 'icon') {
            return errorResponse('Type must be either "image" or "icon"', 400);
        }

        // Verify category exists
        const category = await query(
            'SELECT id FROM categories WHERE id = ?',
            [categoryId]
        );

        if (!category.length) {
            return errorResponse('Category not found', 404);
        }

        // Process and validate the image
        const result = await processUploadedImage(file);

        if (!result.valid) {
            return errorResponse(result.error || 'Invalid image', 400);
        }

        // Update the category with the binary data
        const column = imageType === 'icon' ? 'icon' : 'image';
        await query(
            `UPDATE categories SET ${column} = ? WHERE id = ?`,
            [result.buffer, categoryId]
        );

        return successResponse({
            message: `Category ${imageType} uploaded successfully`,
            size: result.size,
            type: result.mimeType
        });
    } catch (error) {
        console.error('Category image upload error:', error);
        return errorResponse('Failed to upload category image', 500);
    }
}

// DELETE /api/admin/categories/upload-image - Delete category image/icon (Admin only)
export async function DELETE(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        const searchParams = request.nextUrl.searchParams;
        const categoryId = searchParams.get('category_id');
        const imageType = searchParams.get('type'); // 'image' or 'icon'

        if (!categoryId) {
            return errorResponse('Category ID is required', 400);
        }

        if (imageType !== 'image' && imageType !== 'icon') {
            return errorResponse('Type must be either "image" or "icon"', 400);
        }

        const column = imageType === 'icon' ? 'icon' : 'image';
        await query(
            `UPDATE categories SET ${column} = NULL WHERE id = ?`,
            [categoryId]
        );

        return successResponse({
            message: `Category ${imageType} deleted successfully`
        });
    } catch (error) {
        console.error('Category image delete error:', error);
        return errorResponse('Failed to delete category image', 500);
    }
}
