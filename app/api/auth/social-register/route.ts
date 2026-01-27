import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { signToken, verifyOnboardingToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { onboarding_token, user_type, ...sellerDetails } = body;

        // Verify onboarding token
        const payload = verifyOnboardingToken(onboarding_token);
        if (!payload) {
            return errorResponse('Invalid or expired onboarding session. Please try signing in with Google again.');
        }

        const { email, name, google_id, picture } = payload;

        // Check if user already exists (double check)
        const existingUser = await queryOne('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return errorResponse('User already exists. Please login.');
        }

        // 1. Create User
        // Note: Password is set to a random string or empty/null since it's social login. 
        // We'll set a placeholder hash or handle it in DB constraints. Assuming password column allows null or we just put a placeholder.
        const result: any = await query(
            `INSERT INTO users (name, email, google_id, avatar, email_verified, user_type, created_at, updated_at)
             VALUES (?, ?, ?, ?, 1, ?, NOW(), NOW())`,
            [name, email, google_id, picture, user_type]
        );
        const userId = result.insertId;

        // 2. Create Seller Logic if applicable
        if (user_type === 'seller') {
            const { seller_type, company_name, license_number, website, address } = sellerDetails;

            await query(
                `INSERT INTO sellers (user_id, seller_type, company_name, license_number, website, address)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [userId, seller_type || 'owner', company_name, license_number, website, address]
            );
        }

        // 3. Generate Auth Token
        const token = signToken({
            userId,
            email,
            user_type,
        });

        // Fetch created user for response
        const user = await queryOne('SELECT * FROM users WHERE id = ?', [userId]);

        return successResponse(
            {
                user,
                token,
            },
            'Registration successful'
        );

    } catch (error) {
        console.error('Social registration error:', error);
        return errorResponse('Failed to complete registration', 500);
    }
}
