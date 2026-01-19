import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

// GET /api/auth/google - Initiate Google OAuth flow
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const returnUrl = searchParams.get('returnUrl') || '/';

        // Build Google OAuth URL
        const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
        googleAuthUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI);
        googleAuthUrl.searchParams.append('response_type', 'code');
        googleAuthUrl.searchParams.append('scope', 'openid email profile');
        googleAuthUrl.searchParams.append('access_type', 'offline');
        googleAuthUrl.searchParams.append('prompt', 'consent');
        googleAuthUrl.searchParams.append('state', returnUrl); // Pass return URL in state

        return NextResponse.redirect(googleAuthUrl.toString());
    } catch (error) {
        console.error('Google OAuth initiation error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to initiate Google authentication' },
            { status: 500 }
        );
    }
}
