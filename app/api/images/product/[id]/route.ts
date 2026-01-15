import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/images/product/[id] - Get product image by image ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: imageId } = await params;

        const result = await query<{ image_data: Buffer }>(
            'SELECT image_data FROM product_images WHERE id = ?',
            [imageId]
        );

        if (!result.length || !result[0].image_data) {
            return NextResponse.json(
                { error: 'Product image not found' },
                { status: 404 }
            );
        }

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const imageBuffer = new Uint8Array(result[0].image_data);

        // Return as binary data with appropriate content type
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error) {
        console.error('Get product image error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve product image' },
            { status: 500 }
        );
    }
}
