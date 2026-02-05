import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const userId = decoded.userId;

        // Check if user exists in sellers table
        const sellers = await query('SELECT id, avatar FROM sellers WHERE user_id = ?', [userId]);
        const buyers = await query('SELECT avatar FROM buyers WHERE user_id = ?', [userId]);

        const isSeller = sellers.length > 0;

        let sellerLogo = null;
        if (isSeller && sellers[0].avatar) {
            // Handle binary avatar for seller
            const rawAvatar = sellers[0].avatar;
            if (Buffer.isBuffer(rawAvatar)) {
                // Import bufferToDataUrl dynamically or duplicate simple logic if needed, 
                // but we should use the one from lib/image-utils if available.
                // Since we didn't import it at top, let's do it safely or implement simple conversion
                const base64 = rawAvatar.toString('base64');
                sellerLogo = `data:image/webp;base64,${base64}`;
            } else {
                sellerLogo = rawAvatar;
            }
        }

        let buyerAvatar = null;
        if (buyers.length > 0 && buyers[0].avatar) {
            const raw = buyers[0].avatar;
            if (Buffer.isBuffer(raw)) {
                const base64 = raw.toString('base64');
                buyerAvatar = `data:image/webp;base64,${base64}`;
            } else {
                buyerAvatar = raw;
            }
        }

        return NextResponse.json({
            isSeller,
            userId,
            brand_logo: sellerLogo,
            avatar: buyerAvatar
        });

    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
