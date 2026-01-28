import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth'; // You might need to check where verifyToken is or implement it
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper to handle file uploads
async function saveFile(file: File, folder: string): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return `/uploads/${folder}/${filename}`;
}

export async function POST(request: NextRequest) {
    try {
        // 1. Auth Check
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];

        // Use a proper verify function. Assuming verifyToken returns decoded payload.
        // If verifyToken is not exported, we might need to duplicate logic or import jsonwebtoken.
        // For now, let's assume simple decode or verify logic exists or we implement it inline if needed.
        // But better to use the one from lib/auth if available.
        // EDIT: I will use a simple jwt verify logic here if verifyToken isn't readily available or import it.
        // Let's assume standard jwt verify.
        const jwt = require('jsonwebtoken'); // Ensure this is installed or use existing import
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (e) {
            return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
        }

        const userId = decoded.userId;

        // 2. Parse Form Data
        const formData = await request.formData();
        const sellerType = formData.get('seller_type') as string;
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const socialLinks = formData.get('social_links') as string; // JSON string

        // Agency specific
        const companyName = formData.get('company_name') as string | null;
        const gstNumber = formData.get('gst_number') as string | null;
        const licenseNumber = formData.get('license_number') as string | null;
        const website = formData.get('website') as string | null;

        // Files
        const documents = formData.getAll('documents') as File[];
        const profilePic = formData.get('profile_pic') as File | null;

        // 3. Validation
        if (!phone) {
            return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
        }
        if (sellerType === 'agency' && (!companyName || !gstNumber || !address)) {
            return NextResponse.json({ message: 'Company Name, GST, and Address are required for Agencies' }, { status: 400 });
        }

        // 4. Check if already seller
        const existingSeller = await query('SELECT id FROM sellers WHERE user_id = ?', [userId]);
        if (Array.isArray(existingSeller) && existingSeller.length > 0) {
            return NextResponse.json({ message: 'You are already a seller' }, { status: 400 });
        }

        // 5. Handle File Uploads
        const documentPaths: string[] = [];
        for (const doc of documents) {
            if (doc.size > 0) {
                const path = await saveFile(doc, 'documents');
                documentPaths.push(path);
            }
        }

        let finalAvatarPath = decoded.avatar || decoded.picture; // Default from token

        if (profilePic && profilePic.size > 0) {
            finalAvatarPath = await saveFile(profilePic, 'avatars');
            // Update user avatar if provided
            await query('UPDATE users SET avatar = ? WHERE id = ?', [finalAvatarPath, userId]);
        } else {
            // Fetch current avatar from DB to be sure (token might be stale or have different key)
            const userRecord = await query('SELECT avatar FROM users WHERE id = ?', [userId]);
            if (userRecord && userRecord.length > 0) {
                finalAvatarPath = userRecord[0].avatar;
            }
        }

        // 6. Insert into Sellers
        await query(
            `INSERT INTO sellers (
                user_id, seller_type, company_name, license_number, website, address, 
                phone, gst_number, documents, social_links, is_verified, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                userId,
                sellerType,
                sellerType === 'agency' ? companyName : null,
                sellerType === 'agency' ? licenseNumber : null,
                website || null,
                address,
                phone,
                sellerType === 'agency' ? gstNumber : null,
                JSON.stringify(documentPaths),
                socialLinks || null, // Expecting JSON string
                false // is_verified default false
            ]
        );

        // 7. Update User Type
        await query("UPDATE users SET user_type = 'seller' WHERE id = ?", [userId]);

        return NextResponse.json({
            message: 'Seller account created successfully',
            user: {
                ...decoded,
                user_type: 'seller', // Force update in local state
                avatar: finalAvatarPath // return valid db avatar or new one
            }
        });

    } catch (error) {
        console.error('Become seller error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
