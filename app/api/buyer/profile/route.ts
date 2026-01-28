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

        // Fetch buyer profile
        const buyers = await query(`
            SELECT b.*, u.name, u.email 
            FROM buyers b 
            JOIN users u ON b.user_id = u.id 
            WHERE b.user_id = ?
        `, [userId]);

        if (!buyers || buyers.length === 0) {
            // Fallback: If no buyer entry exists yet (shouldn't happen if properly initialized)
            // Return basic user info without avatar
            const users = await query('SELECT name, email, location FROM users WHERE id = ?', [userId]);
            if (users && users.length > 0) {
                // Auto-create buyer entry for consistency?
                await query('INSERT INTO buyers (user_id) VALUES (?)', [userId]);

                return NextResponse.json({
                    buyer: {
                        name: users[0].name,
                        email: users[0].email,
                        avatar: null,
                        location: users[0].location
                    }
                });
            }
            return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json({ buyer: buyers[0] });

    } catch (error) {
        console.error('Get buyer profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper to handle file uploads
async function saveFile(file: File, folder: string): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return `/uploads/${folder}/${filename}`;
}

export async function PUT(request: NextRequest) {
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

        const formData = await request.formData();

        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const location = formData.get('location') as string;
        const avatarFile = formData.get('avatar') as File | null;

        // Update Avatar if provided
        if (avatarFile && avatarFile.size > 0) {
            const avatarPath = await saveFile(avatarFile, 'avatars');
            await query('UPDATE buyers SET avatar = ?, updated_at = NOW() WHERE user_id = ?', [avatarPath, userId]);
        }

        // Update other fields in buyers table
        await query(
            'UPDATE buyers SET phone = ?, location = ?, updated_at = NOW() WHERE user_id = ?',
            [phone, location, userId]
        );

        // Also update users name/location to keep sync
        await query(
            'UPDATE users SET name = ?, location = ?, updated_at = NOW() WHERE id = ?',
            [name, location, userId]
        );

        // Fetch updated buyer
        const buyers = await query('SELECT * FROM buyers WHERE user_id = ?', [userId]);

        return NextResponse.json({
            message: 'Profile updated successfully',
            buyer: buyers[0]
        });

    } catch (error) {
        console.error('Update buyer profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
