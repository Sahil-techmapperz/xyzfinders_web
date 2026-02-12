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

            const updates: string[] = [];
            const params: any[] = [];

            if (!user.google_id) {
                updates.push('google_id = ?');
                params.push(googleUser.id);
            }

            // Update location if not set and locale is available
            if (!user.location && googleUser.locale) {
                updates.push('location = ?');
                params.push(googleUser.locale);
            }

            if (updates.length > 0) {
                updates.push('updated_at = NOW()');
                params.push(userId);
                await query(
                    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
                    params
                );
            }

            // Sync buyer profile (Insert only if not exists, do not overwrite)
            await query(
                `INSERT IGNORE INTO buyers (user_id, avatar, created_at, updated_at)
                 VALUES (?, ?, NOW(), NOW())`,
                [userId, googleUser.picture || null]
            );

        } else {
            // Create new user (DEFAULT TO BUYER)
            // Use locale as location
            const result: any = await query(
                `INSERT INTO users (name, email, google_id, email_verified, location, user_type, created_at, updated_at)
                 VALUES (?, ?, ?, 1, ?, 'buyer', NOW(), NOW())`,
                [googleUser.name, googleUser.email, googleUser.id, googleUser.locale || null]
            );
            userId = result.insertId;

            // Also create buyer profile
            await query(
                `INSERT INTO buyers (user_id, avatar, created_at, updated_at)
                 VALUES (?, ?, NOW(), NOW())`,
                [userId, googleUser.picture || null]
            );
        }

        // Generate JWT token
        const token = signToken({
            userId,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            user_type: userType,
        });

        // Redirect to frontend with token
        // Use window.opener logic if this was a popup, but since we are doing full redirect flow for now (from modal button),
        // we can just redirect back to the returnUrl (state). 
        // Note: The Header.tsx keeps modal open, so we might want to handle token storage differently?
        // Actually, the standard flow: redirect main window -> callback -> redirect main window to App with token query param.
        // The App (Header or Layout) needs to read this token and store it.
        // Or we can just redirect to '/', and the user will look logged in.
        // The Header check works on mount, but if we redirect to a page with `?token=...`, we need logic to capture it.

        // Let's stick to the URL query param method which was already set up in the previous implementation plan context
        // (GOOGLE_OAUTH_SETUP.md mentions handling it in a component).

        const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${state}?token=${token}`;
        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error('Google OAuth callback error:', error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/?error=authentication_failed`
        );
    }
}
