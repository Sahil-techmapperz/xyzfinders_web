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
        // Map sellers.avatar to brand_logo for frontend compatibility
        const sellers = await query('SELECT id, avatar as brand_logo FROM sellers WHERE user_id = ?', [userId]);
        const buyers = await query('SELECT avatar FROM buyers WHERE user_id = ?', [userId]);

        const isSeller = sellers.length > 0;
        const brandLogo = sellers.length > 0 ? sellers[0].brand_logo : null;
        const buyerAvatar = buyers.length > 0 ? buyers[0].avatar : null;

        return NextResponse.json({
            isSeller,
            userId,
            brand_logo: brandLogo,
            avatar: buyerAvatar
        });

    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
