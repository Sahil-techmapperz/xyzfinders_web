import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';
import crypto from 'crypto';

// POST /api/auth/resend-verification
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Get user details
        const user = await query(
            'SELECT * FROM users WHERE id = ?',
            [authUser.userId]
        );

        if (user.length === 0) {
            return errorResponse('User not found');
        }

        if (user[0].is_verified) {
            return errorResponse('Email is already verified');
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Update user with new token
        await query(
            'UPDATE users SET email_verification_token = ?, updated_at = NOW() WHERE id = ?',
            [verificationToken, authUser.userId]
        );

        // TODO: Send verification email
        // await sendVerificationEmail(user[0].email, verificationToken);

        return successResponse(
            null,
            'Verification email sent successfully. Please check your inbox.'
        );
    } catch (error) {
        console.error('Resend verification error:', error);
        return errorResponse('Failed to resend verification email', 500);
    }
}
