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
    current_mode?: 'buyer' | 'seller' | 'admin';
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

        // Fetch buyer profile for avatar
        const buyerProfile = await queryOne<any>('SELECT avatar FROM buyers WHERE user_id = ?', [user.id]);
        const buyerAvatar = buyerProfile ? buyerProfile.avatar : null;

        // Check if user is also a seller and get logo
        const sellers = await queryOne<any>('SELECT id, avatar as brand_logo FROM sellers WHERE user_id = ?', [user.id]);
        const isSeller = !!sellers;
        const brandLogo = sellers ? sellers.brand_logo : null;

        // Ensure current_mode is returned (defaulting to buyer if null)
        const responseUser = {
            ...userWithoutPassword,
            current_mode: user.current_mode || 'buyer',
            is_seller: isSeller,
            avatar: buyerAvatar, // Use buyer avatar as default 'avatar'
            brand_logo: brandLogo
        };

        return successResponse(
            {
                user: responseUser,
                token,
            },
            'Login successful'
        );
    } catch (error) {
        console.error('Login error:', error);
        return errorResponse('Failed to login', 500);
    }
}
