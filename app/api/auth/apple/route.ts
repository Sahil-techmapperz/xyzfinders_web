import { NextRequest, NextResponse } from 'next/server';

const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID || '';
const APPLE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/apple/callback`;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get('returnUrl') || '/';

    if (!APPLE_CLIENT_ID) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?error=apple_not_configured`);
    }

    const appleAuthUrl = `https://appleid.apple.com/auth/authorize?` +
        new URLSearchParams({
            client_id: APPLE_CLIENT_ID,
            redirect_uri: APPLE_REDIRECT_URI,
            response_type: 'code id_token',
            state: returnUrl,
            scope: 'name email',
            response_mode: 'form_post'
        }).toString();

    return NextResponse.redirect(appleAuthUrl);
}
