import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { signToken } from '@/lib/auth';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
    id_token: string;
}

interface GoogleUserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name?: string;
    picture: string;
    locale: string;
}

// GET /api/auth/google/callback - Handle Google OAuth callback
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const state = searchParams.get('state') || '/';
        const error = searchParams.get('error');

        if (error) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth?error=google_auth_failed`);
        }

        if (!code) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth?error=missing_code`);
        }

        // Exchange authorization code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to exchange code for tokens');
        }

        const tokens: GoogleTokenResponse = await tokenResponse.json();

        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        if (!userInfoResponse.ok) {
            throw new Error('Failed to fetch user info');
        }

        const googleUser: GoogleUserInfo = await userInfoResponse.json();

        // Check if user exists
        const existingUsers = await query(
            'SELECT * FROM users WHERE email = ? OR google_id = ?',
            [googleUser.email, googleUser.id]
        );

        let userId: number;
        let userType = 'buyer';

        if (existingUsers.length > 0) {
            // User exists, update Google ID if needed
            const user = existingUsers[0];
            userId = user.id;
            userType = user.user_type;

            if (!user.google_id) {
                await query(
                    'UPDATE users SET google_id = ?, updated_at = NOW() WHERE id = ?',
                    [googleUser.id, userId]
                );
            }
        } else {
            // Create new user
            const result: any = await query(
                `INSERT INTO users (name, email, google_id, avatar, email_verified, user_type, created_at, updated_at)
                 VALUES (?, ?, ?, ?, 1, 'buyer', NOW(), NOW())`,
                [googleUser.name, googleUser.email, googleUser.id, googleUser.picture]
            );
            userId = result.insertId;
        }

        // Generate JWT token
        const token = signToken({
            userId,
            email: googleUser.email,
            user_type: userType,
        });

        // Redirect to frontend with token
        const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${state}?token=${token}`;
        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.error('Google OAuth callback error:', error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth?error=authentication_failed`
        );
    }
}
