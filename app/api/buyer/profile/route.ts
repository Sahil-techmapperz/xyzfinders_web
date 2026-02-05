import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { processUploadedImage, bufferToDataUrl } from '@/lib/image-utils';

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
            // Fallback: If no buyer entry exists yet
            const users = await query('SELECT name, email, location FROM users WHERE id = ?', [userId]);
            if (users && users.length > 0) {
                // Auto-create buyer entry for consistency
                await query('INSERT INTO buyers (user_id) VALUES (?)', [userId]);

                const user = users[0];
                return NextResponse.json({
                    buyer: {
                        name: user.name,
                        email: user.email,
                        avatar: null,
                        location: user.location
                    }
                });
            }
            return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
        }

        const buyer = buyers[0];

        // Handle avatar: It could be a Buffer (new blob storage) or String (legacy path/url)
        let avatarSource = null;
        if (buyer.avatar) {
            console.log('Avatar type check:', typeof buyer.avatar, 'Is Buffer:', Buffer.isBuffer(buyer.avatar));

            if (Buffer.isBuffer(buyer.avatar)) {
                avatarSource = bufferToDataUrl(buyer.avatar, 'image/webp');
            } else if (typeof buyer.avatar === 'object') {
                // If it's an object but not a "Buffer" instance properly, try to convert
                try {
                    const buf = Buffer.from(buyer.avatar);
                    avatarSource = bufferToDataUrl(buf, 'image/webp');
                } catch (e) {
                    console.error('Failed to convert avatar object to buffer:', e);
                }
            } else {
                avatarSource = buyer.avatar;
            }
        }

        const responseBuyer = {
            ...buyer,
            avatar: avatarSource
        };

        return NextResponse.json({ buyer: responseBuyer });

    } catch (error) {
        console.error('Get buyer profile error:', error);
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

        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const location = formData.get('location') as string;
        const avatarFile = formData.get('avatar') as File | null;

        // Update Avatar if provided
        if (avatarFile && avatarFile.size > 0) {
            console.log('Processing avatar update for user:', userId);

            // Process image using shared utility (Validates & Converts to WebP)
            const result = await processUploadedImage(avatarFile);

            if (!result.valid) {
                return NextResponse.json({ message: result.error || 'Invalid image' }, { status: 400 });
            }

            // Save binary data to BUYERS table 'avatar' column (DB Storage)
            // User confirmed column is now BLOB/LONGBLOB
            await query('UPDATE buyers SET avatar = ?, updated_at = NOW() WHERE user_id = ?', [result.buffer, userId]);
            console.log('Avatar updated in BUYERS table (Blob)');
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
        const buyers = await query(`
            SELECT b.*, u.name, u.email
            FROM buyers b 
            JOIN users u ON b.user_id = u.id 
            WHERE b.user_id = ?
        `, [userId]);

        const buyer = buyers[0];

        // Resolve avatar source again for the response
        let avatarSource = null;
        if (buyer.avatar) {
            if (Buffer.isBuffer(buyer.avatar)) {
                avatarSource = bufferToDataUrl(buyer.avatar, 'image/webp');
            } else {
                avatarSource = buyer.avatar;
            }
        }

        const responseBuyer = {
            ...buyer,
            avatar: avatarSource
        };

        return NextResponse.json({
            message: 'Profile updated successfully',
            buyer: responseBuyer
        });

    } catch (error) {
        console.error('Update buyer profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
