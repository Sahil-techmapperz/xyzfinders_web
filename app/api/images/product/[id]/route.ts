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

        console.log('Image query result:', {
            imageId,
            found: result.length > 0,
            hasData: result.length > 0 && result[0].image_data ? true : false,
            dataSize: result.length > 0 && result[0].image_data ? result[0].image_data.length : 0
        });

        if (!result.length || !result[0].image_data || result[0].image_data.length === 0) {
            return NextResponse.json(
                { error: 'Product image not found or empty' },
                { status: 404 }
            );
        }

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const imageBuffer = new Uint8Array(result[0].image_data);

        // Return as binary data with appropriate content type
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/webp',
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
