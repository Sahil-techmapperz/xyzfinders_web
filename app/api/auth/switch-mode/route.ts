import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
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
        const { mode } = await request.json();

        if (!['buyer', 'seller', 'admin'].includes(mode)) {
            return NextResponse.json({ message: 'Invalid mode' }, { status: 400 });
        }

        // Check if switching to seller, verify if they are actually a seller
        if (mode === 'seller') {
            const users = await query('SELECT user_type FROM users WHERE id = ?', [userId]);
            if (users.length === 0 || users[0].user_type !== 'seller') {
                return NextResponse.json({ message: 'User is not a seller' }, { status: 403 });
            }
        }

        await query('UPDATE users SET current_mode = ? WHERE id = ?', [mode, userId]);

        return NextResponse.json({
            message: 'Mode switched successfully',
            user: {
                ...decoded,
                current_mode: mode
            }
        });

    } catch (error) {
        console.error('Switch mode error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
