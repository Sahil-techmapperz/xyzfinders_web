import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';
import bcrypt from 'bcryptjs';

// POST /api/auth/reset-password
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, password, password_confirm } = body;

        if (!token || !password || !password_confirm) {
            return errorResponse('All fields are required');
        }

        if (password !== password_confirm) {
            return errorResponse('Passwords do not match');
        }

        if (password.length < 6) {
            return errorResponse('Password must be at least 6 characters');
        }

        // Find user by reset token
        const user = await queryOne(
            'SELECT * FROM users WHERE password_reset_token = ? AND password_reset_expires > NOW()',
            [token]
        );

        if (!user) {
            return errorResponse('Invalid or expired reset token');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear reset token
        await query(
            `UPDATE users SET 
        password = ?,
        password_reset_token = NULL,
        password_reset_expires = NULL,
        updated_at = NOW()
       WHERE id = ?`,
            [hashedPassword, user.id]
        );

        return successResponse(
            null,
            'Password reset successfully. You can now login with your new password.'
        );
    } catch (error) {
        console.error('Reset password error:', error);
        return errorResponse('Failed to reset password', 500);
    }
}
