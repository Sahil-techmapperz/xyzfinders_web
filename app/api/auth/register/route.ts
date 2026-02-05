import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { query, queryOne } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';
import { User } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('[REGISTER] Received body:', JSON.stringify(body, null, 2));

        const { name, email, phone, password, password_confirmation, user_type } = body;

        // Validation
        if (!name || !email || !password || !user_type) {
            console.log('[REGISTER ERROR] Missing fields:', { name: !!name, email: !!email, password: !!password, user_type: !!user_type });
            return errorResponse('Name, email, password and user type are required');
        }

        if (password !== password_confirmation) {
            console.log('[REGISTER ERROR] Passwords do not match');
            return errorResponse('Passwords do not match');
        }

        if (!['buyer', 'seller'].includes(user_type)) {
            console.log('[REGISTER ERROR] Invalid user type:', user_type);
            return errorResponse('Invalid user type');
        }

        // Check if user already exists
        let sql = 'SELECT * FROM users WHERE email = ?';
        const params: any[] = [email];

        if (phone) {
            sql += ' OR phone = ?';
            params.push(phone);
        }

        const existingUser = await queryOne<User>(sql, params);

        if (existingUser) {
            if (existingUser.email === email) {
                return errorResponse('User with this email already exists');
            }
            if (phone && existingUser.phone === phone) {
                return errorResponse('User with this phone already exists');
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result: any = await query(
            `INSERT INTO users (name, email, phone, password, user_type, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [name, email, phone || null, hashedPassword, user_type]
        );

        const userId = result.insertId;

        // Fetch created user
        const user = await queryOne<User>('SELECT id, name, email, phone, user_type, created_at, updated_at FROM users WHERE id = ?', [userId]);

        if (!user) {
            return errorResponse('Failed to create user');
        }

        // Generate JWT token
        const token = signToken({
            userId: user.id,
            email: user.email,
            user_type: user.user_type,
        });

        return successResponse(
            {
                user,
                token,
            },
            'User registered successfully'
        );
    } catch (error) {
        console.error('Registration error:', error);
        return errorResponse('Failed to register user', 500);
    }
}
