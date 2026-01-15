import { NextRequest } from 'next/server';
import { queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/notifications/settings - Get notification settings
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const settings = await queryOne(
            'SELECT * FROM notification_settings WHERE user_id = ?',
            [authUser.userId]
        );

        // Return default settings if none exist
        if (!settings) {
            return successResponse({
                email_messages: true,
                email_reviews: true,
                email_products: true,
                email_promotions: true,
                push_messages: true,
                push_reviews: true,
            });
        }

        return successResponse(settings);
    } catch (error) {
        console.error('Get notification settings error:', error);
        return errorResponse('Failed to fetch settings', 500);
    }
}

// PUT /api/notifications/settings - Update notification settings
export async function PUT(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();

        // Check if settings exist
        const existing = await queryOne(
            'SELECT * FROM notification_settings WHERE user_id = ?',
            [authUser.userId]
        );

        if (existing) {
            // Update
            await queryOne(
                `UPDATE notification_settings SET
          email_messages = ?,
          email_reviews = ?,
          email_products = ?,
          email_promotions = ?,
          push_messages = ?,
          push_reviews = ?,
          updated_at = NOW()
         WHERE user_id = ?`,
                [
                    body.email_messages ?? true,
                    body.email_reviews ?? true,
                    body.email_products ?? true,
                    body.email_promotions ?? true,
                    body.push_messages ?? true,
                    body.push_reviews ?? true,
                    authUser.userId,
                ]
            );
        } else {
            // Insert
            await queryOne(
                `INSERT INTO notification_settings 
         (user_id, email_messages, email_reviews, email_products, email_promotions, push_messages, push_reviews, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [
                    authUser.userId,
                    body.email_messages ?? true,
                    body.email_reviews ?? true,
                    body.email_products ?? true,
                    body.email_promotions ?? true,
                    body.push_messages ?? true,
                    body.push_reviews ?? true,
                ]
            );
        }

        return successResponse(null, 'Settings updated successfully');
    } catch (error) {
        console.error('Update notification settings error:', error);
        return errorResponse('Failed to update settings', 500);
    }
}
