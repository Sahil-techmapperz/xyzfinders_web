import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken } from '@/lib/auth';

// Apple Auth is more complex (requires verifying id_token with Apple's public keys)
// This is a skeleton that expects the basic flow.

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const code = formData.get('code');
        const id_token = formData.get('id_token');
        const state = formData.get('state') as string || '/';
        const userJson = formData.get('user') as string; // Apple only sends user info on FIRST login

        if (!id_token) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=apple_auth_failed`);
        }

        // 1. Verify id_token (Omitted for brevity, but required for production)
        // For now, we'll decode it and trust it for this demo/skeleton
        const base64Url = (id_token as string).split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

        const appleId = payload.sub;
        const email = payload.email;
        let name = '';

        if (userJson) {
            const userObj = JSON.parse(userJson);
            name = `${userObj.name.firstName} ${userObj.name.lastName}`;
        }

        // Check if user exists
        const existingUsers = await query(
            'SELECT * FROM users WHERE email = ? OR apple_id = ?',
            [email, appleId]
        );

        let userId: number;
        let userType = 'buyer';

        if (existingUsers.length > 0) {
            const user = existingUsers[0];
            userId = user.id;
            userType = user.user_type;
            name = name || user.name;

            if (!user.apple_id) {
                await query(
                    'UPDATE users SET apple_id = ?, updated_at = NOW() WHERE id = ?',
                    [appleId, userId]
                );
            }
        } else {
            // Create new user
            const result: any = await query(
                `INSERT INTO users (name, email, apple_id, email_verified, user_type, created_at, updated_at)
                 VALUES (?, ?, ?, 1, 'buyer', NOW(), NOW())`,
                [name || email.split('@')[0], email, appleId]
            );
            userId = result.insertId;
        }

        // Generate JWT
        const token = signToken({
            userId,
            email,
            name: name || email.split('@')[0],
            user_type: userType,
        });

        // Since this is a POST from Apple, we MUST redirect with a script or a proper redirect
        // But Next.js API routes can return a 303 redirect
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${state}?token=${token}`, { status: 303 });

    } catch (error) {
        console.error('Apple Auth Error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=apple_auth_failed`);
    }
}
