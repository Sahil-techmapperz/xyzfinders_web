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

        // Fetch seller details (joined with user for basic info)
        const sellers = await query(`
            SELECT 
                s.*, 
                u.name as user_name, 
                u.email as user_email
            FROM sellers s
            JOIN users u ON s.user_id = u.id
            WHERE s.user_id = ?
        `, [userId]);

        if (!sellers || sellers.length === 0) {
            return NextResponse.json({ message: 'Seller profile not found' }, { status: 404 });
        }

        const seller = sellers[0];

        // Handle avatar: Check if it's a buffer (new DB storage) or string (legacy)
        let avatarSource = null;
        if (seller.avatar) {
            if (Buffer.isBuffer(seller.avatar)) {
                avatarSource = bufferToDataUrl(seller.avatar, 'image/webp');
            } else if (typeof seller.avatar === 'object') {
                // Convert generic object to buffer if needed (robust check)
                try {
                    const buf = Buffer.from(seller.avatar);
                    avatarSource = bufferToDataUrl(buf, 'image/webp');
                } catch (e) {
                    console.error('Failed to convert seller avatar object to buffer:', e);
                }
            } else {
                // Legacy string path
                avatarSource = seller.avatar;
            }
        }

        const responseSeller = {
            ...seller,
            avatar: avatarSource
        };

        return NextResponse.json({ seller: responseSeller });

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

        // "profile_pic" is the key used in the seller page form
        const profilePic = formData.get('profile_pic') as File | null;

        // Update Avatar if provided
        if (profilePic && profilePic.size > 0) {
            console.log('Processing seller avatar update for user:', userId);
            const result = await processUploadedImage(profilePic);

            if (!result.valid) {
                return NextResponse.json({ message: result.error || 'Invalid image' }, { status: 400 });
            }

            // Save binary data to SELLERS table 'avatar' column
            await query('UPDATE sellers SET avatar = ?, updated_at = NOW() WHERE user_id = ?', [result.buffer, userId]);
            console.log('Avatar updated in SELLERS table');
        }

        // Validate social_links JSON
        let validSocialLinks = null;
        if (socialLinks) {
            try {
                JSON.parse(socialLinks);
                validSocialLinks = socialLinks;
            } catch (e) {
                console.error('Invalid social_links JSON received:', socialLinks);
                validSocialLinks = null;
            }
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
                phone || null,
                address || null,
                companyName || null,
                gstNumber || null,
                website || null,
                validSocialLinks,
                userId
            ]
        );

        // Fetch updated data for response
        const sellers = await query(`
            SELECT 
                s.*, 
                u.name as user_name, 
                u.email as user_email
            FROM sellers s
            JOIN users u ON s.user_id = u.id
            WHERE s.user_id = ?
        `, [userId]);

        const seller = sellers[0];

        // Resolve avatar
        let avatarSource = null;
        if (seller.avatar) {
            if (Buffer.isBuffer(seller.avatar)) {
                avatarSource = bufferToDataUrl(seller.avatar, 'image/webp');
            } else if (typeof seller.avatar === 'object') {
                try {
                    const buf = Buffer.from(seller.avatar);
                    avatarSource = bufferToDataUrl(buf, 'image/webp');
                } catch (e) { }
            } else {
                avatarSource = seller.avatar;
            }
        }

        const responseSeller = {
            ...seller,
            avatar: avatarSource
        };

        return NextResponse.json({
            message: 'Profile updated successfully',
            seller: responseSeller
        });

    } catch (error) {
        console.error('Update seller profile error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
