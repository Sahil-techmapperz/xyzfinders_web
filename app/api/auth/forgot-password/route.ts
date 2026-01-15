import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import crypto from 'crypto';

// POST /api/auth/forgot-password
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return errorResponse('Email is required');
        }

        // Find user
        const user = await queryOne(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // Always return success for security (don't reveal if email exists)
        if (!user) {
            return successResponse(null, 'Password reset link sent to your email');
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Save reset token
        await query(
            `UPDATE users SET 
        password_reset_token = ?,
        password_reset_expires = ?,
        updated_at = NOW()
       WHERE id = ?`,
            [resetToken, resetExpiry, user.id]
        );

        // TODO: Send reset email
        // await sendPasswordResetEmail(user.email, resetToken);

        return successResponse(null, 'Password reset link sent to your email');
    } catch (error) {
        console.error('Forgot password error:', error);
        return errorResponse('Failed to process password reset request', 500);
    }
}
