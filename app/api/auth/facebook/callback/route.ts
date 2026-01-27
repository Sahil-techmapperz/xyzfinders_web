import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken } from '@/lib/auth';

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '';
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '';
const FACEBOOK_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/facebook/callback`;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state') || '/';
        const error = searchParams.get('error');

        if (error || !code) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=facebook_auth_failed`);
        }

        // Exchange code for access token
        const tokenResponse = await fetch(`https://graph.facebook.com/v12.0/oauth/access_token?` +
            new URLSearchParams({
                client_id: FACEBOOK_CLIENT_ID,
                client_secret: FACEBOOK_CLIENT_SECRET,
                redirect_uri: FACEBOOK_REDIRECT_URI,
                code: code
            }).toString());

        const tokenData = await tokenResponse.json();
        if (tokenData.error) {
            throw new Error(tokenData.error.message);
        }

        const accessToken = tokenData.access_token;

        // Get user info
        const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
        const fbUser = await userResponse.json();

        if (!fbUser.email) {
            // Some FB accounts don't have emails verified or shared
            fbUser.email = `${fbUser.id}@facebook.com`;
        }

        // Check if user exists
        const existingUsers = await query(
            'SELECT * FROM users WHERE email = ? OR facebook_id = ?',
            [fbUser.email, fbUser.id]
        );

        let userId: number;
        let userType = 'buyer';

        if (existingUsers.length > 0) {
            const user = existingUsers[0];
            userId = user.id;
            userType = user.user_type;

            if (!user.facebook_id) {
                await query(
                    'UPDATE users SET facebook_id = ?, updated_at = NOW() WHERE id = ?',
                    [fbUser.id, userId]
                );
            }
        } else {
            // Create new user
            const result: any = await query(
                `INSERT INTO users (name, email, facebook_id, avatar, email_verified, user_type, created_at, updated_at)
                 VALUES (?, ?, ?, ?, 1, 'buyer', NOW(), NOW())`,
                [fbUser.name, fbUser.email, fbUser.id, fbUser.picture?.data?.url]
            );
            userId = result.insertId;
        }

        // Generate JWT
        const token = signToken({
            userId,
            email: fbUser.email,
            name: fbUser.name,
            picture: fbUser.picture?.data?.url,
            user_type: userType,
        });

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}${state}?token=${token}`);

    } catch (error) {
        console.error('Facebook Auth Error:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=facebook_auth_failed`);
    }
}
