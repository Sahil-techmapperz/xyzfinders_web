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
        const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture,location&access_token=${accessToken}`);
        const fbUser = await userResponse.json();

        const locationName = fbUser.location?.name || null;

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

            const updates: string[] = [];
            const params: any[] = [];

            if (!user.facebook_id) {
                updates.push('facebook_id = ?');
                params.push(fbUser.id);
            }

            // Update location if not set and available from FB
            if (!user.location && locationName) {
                updates.push('location = ?');
                params.push(locationName);
            }

            if (updates.length > 0) {
                updates.push('updated_at = NOW()');
                params.push(userId);
                await query(
                    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
                    params
                );
            }
            // Sync Buyer Profile (Insert only if not exists)
            await query(
                `INSERT IGNORE INTO buyers (user_id, avatar, created_at, updated_at)
                 VALUES (?, ?, NOW(), NOW())`,
                [userId, fbUser.picture?.data?.url || null]
            );
        } else {
            // Create new user
            const result: any = await query(
                `INSERT INTO users (name, email, facebook_id, avatar, email_verified, location, user_type, created_at, updated_at)
                 VALUES (?, ?, ?, ?, 1, ?, 'buyer', NOW(), NOW())`,
                [fbUser.name, fbUser.email, fbUser.id, fbUser.picture?.data?.url || null, locationName]
            );
            userId = result.insertId;

            // Sync Buyer Profile
            await query(
                `INSERT INTO buyers (user_id, avatar, created_at, updated_at)
                 VALUES (?, ?, NOW(), NOW())`,
                [userId, fbUser.picture?.data?.url || null]
            );
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
