import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { queryOne } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

interface UserRow {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    user_type: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return errorResponse('Email and password are required');
        }

        // Find user by email or phone
        const user = await queryOne<UserRow>(
            'SELECT * FROM users WHERE email = ? OR phone = ?',
            [email, email]
        );

        if (!user) {
            return errorResponse('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return errorResponse('Invalid credentials');
        }

        // Generate JWT token
        const token = signToken({
            userId: user.id,
            email: user.email,
            user_type: user.user_type,
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return successResponse(
            {
                user: userWithoutPassword,
                token,
            },
            'Login successful'
        );
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse('Failed to login', 500);
    }
}
