import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper to handle file uploads (duplicated from become-seller, could be refactored to utils)
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

        // Fetch seller details joined with some user details (like email/name primarily from user table 
        // but potentially overwritten by seller specific data if we decide to separate them further)
        // For now, Name/Email come from Users. Business info comes from Sellers.

        const sellers = await query(`
            SELECT 
                s.*, 
                u.name as user_name, 
                u.email as user_email, 
                s.avatar as user_avatar 
            FROM sellers s
            JOIN users u ON s.user_id = u.id
            WHERE s.user_id = ?
        `, [userId]);

        if (!sellers || sellers.length === 0) {
            return NextResponse.json({ message: 'Seller profile not found' }, { status: 404 });
        }

        return NextResponse.json({ seller: sellers[0] });

    } catch (error) {
        console.error('Get seller profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
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

        // Fields to update
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const companyName = formData.get('company_name') as string;
        const gstNumber = formData.get('gst_number') as string;
        const website = formData.get('website') as string;
        const socialLinks = formData.get('social_links') as string;

        const profilePic = formData.get('profile_pic') as File | null;

        // Update Avatar if provided
        if (profilePic && profilePic.size > 0) {
            const avatarPath = await saveFile(profilePic, 'avatars');
            await query('UPDATE sellers SET avatar = ? WHERE user_id = ?', [avatarPath, userId]);
        }

        // Update Seller Info
        await query(
            `UPDATE sellers SET 
                phone = ?, 
                address = ?, 
                company_name = ?, 
                gst_number = ?, 
                website = ?, 
                social_links = ?,
                updated_at = NOW()
             WHERE user_id = ?`,
            [
                phone,
                address,
                companyName || null,
                gstNumber || null,
                website || null,
                socialLinks || null,
                userId
            ]
        );

        // Ideally we return the updated data
        const sellers = await query(`
            SELECT 
                s.*, 
                u.name as user_name, 
                u.email as user_email, 
                s.avatar as user_avatar 
            FROM sellers s
            JOIN users u ON s.user_id = u.id
            WHERE s.user_id = ?
        `, [userId]);

        return NextResponse.json({
            message: 'Profile updated successfully',
            seller: sellers[0]
        });

    } catch (error) {
        console.error('Update seller profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
