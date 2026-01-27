import { NextRequest, NextResponse } from 'next/server';

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '';
const FACEBOOK_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/facebook/callback`;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get('returnUrl') || '/';

    if (!FACEBOOK_CLIENT_ID) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=facebook_not_configured`);
    }

    const facebookAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth?` +
        new URLSearchParams({
            client_id: FACEBOOK_CLIENT_ID,
            redirect_uri: FACEBOOK_REDIRECT_URI,
            state: returnUrl,
            scope: 'email,public_profile',
            response_type: 'code'
        }).toString();

    return NextResponse.redirect(facebookAuthUrl);
}
