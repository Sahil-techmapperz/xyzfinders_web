import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/images/category/[id] - Get category image/icon
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: categoryId } = await params;
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type') || 'image'; // 'image' or 'icon'

        const column = type === 'icon' ? 'icon' : 'image';

        const result = await query<{ icon?: Buffer; image?: Buffer }>(
            `SELECT ${column} FROM categories WHERE id = ?`,
            [categoryId]
        );

        const imageData = result[0]?.[column];

        if (!result.length || !imageData) {
            return NextResponse.json(
                { error: 'Category image not found' },
                { status: 404 }
            );
        }

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const imageBuffer = new Uint8Array(imageData);

        // Return as binary data with appropriate content type
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error) {
        console.error('Get category image error:', error);
        return NextResponse.json(
            { error: 'Failed to retrieve category image' },
            { status: 500 }
        );
    }
}
