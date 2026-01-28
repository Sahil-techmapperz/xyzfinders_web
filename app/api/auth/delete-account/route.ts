import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
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

        // Start a transaction if needed, but for now simple sequential deletes
        // Delete seller profile if exists
        await query('DELETE FROM sellers WHERE user_id = ?', [userId]);

        // Delete buyer profile if exists
        await query('DELETE FROM buyers WHERE user_id = ?', [userId]);

        // Delete user
        await query('DELETE FROM users WHERE id = ?', [userId]);

        return NextResponse.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Account deletion error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
