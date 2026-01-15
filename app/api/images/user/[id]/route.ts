import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { bufferToBase64 } from '@/lib/image-utils';

// GET /api/images/user/[id] - Get user profile image
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userId } = await params;

        const result = await query<{ profile_image: Buffer }>(
            'SELECT profile_image FROM users WHERE id = ?',
            [userId]
        );

        if (!result.length || !result[0].profile_image) {
            return NextResponse.json(
                { error: 'Profile image not found' },
                { status: 404 }
            );
        }

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const imageBuffer = new Uint8Array(result[0].profile_image);

        // Return as binary data with appropriate content type
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error) {
        console.error('Get user image error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve profile image' },
            { status: 500 }
        );
    }
}
