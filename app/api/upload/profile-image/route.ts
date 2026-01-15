import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import { processUploadedImage } from '@/lib/image-utils';

// POST /api/upload/profile-image - Upload user profile image
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return errorResponse('No image file provided', 400);
        }

        // Process and validate the image
        const result = await processUploadedImage(file);

        if (!result.valid) {
            return errorResponse(result.error || 'Invalid image', 400);
        }

        // Save the binary data to database
        await query(
            'UPDATE users SET profile_image = ? WHERE id = ?',
            [result.buffer, authUser.userId]
        );

        return successResponse({
            message: 'Profile image uploaded successfully',
            size: result.size,
            type: result.mimeType
        });
    } catch (error) {
        console.error('Profile image upload error:', error);
        return errorResponse('Failed to upload profile image', 500);
    }
}

// DELETE /api/upload/profile-image - Delete user profile image
export async function DELETE(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        await query(
            'UPDATE users SET profile_image = NULL WHERE id = ?',
            [authUser.userId]
        );

        return successResponse({
            message: 'Profile image deleted successfully'
        });
    } catch (error) {
        console.error('Profile image delete error:', error);
        return errorResponse('Failed to delete profile image', 500);
    }
}
