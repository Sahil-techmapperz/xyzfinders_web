import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import crypto from 'crypto';

// POST /api/auth/verify-email
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        if (!token) {
            return errorResponse('Verification token is required');
        }

        // Find user by verification token
        const user = await queryOne(
            'SELECT * FROM users WHERE email_verification_token = ?',
            [token]
        );

        if (!user) {
            return errorResponse('Invalid or expired verification token');
        }

        // Update user as verified
        await query(
            `UPDATE users SET 
        is_verified = 1,
        email_verified_at = NOW(),
        email_verification_token = NULL,
        updated_at = NOW()
       WHERE id = ?`,
            [user.id]
        );

        return successResponse(
            { user: { id: user.id, email: user.email, is_verified: true } },
            'Email verified successfully! You can now create product listings.'
        );
    } catch (error) {
        console.error('Email verification error:', error);
        return errorResponse('Failed to verify email', 500);
    }
}
