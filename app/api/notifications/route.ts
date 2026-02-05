import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/notifications - Get user notifications
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Fetch notifications (for the receiver)
        const notifications = await query(
            `SELECT n.*, s.name as sender_name 
             FROM notifications n 
             LEFT JOIN users s ON n.sender_id = s.id 
             WHERE n.receiver_id = ? 
             ORDER BY n.created_at DESC LIMIT 50`,
            [authUser.userId]
        );
        console.log('[DEBUG_NOTIF] Fetched:', notifications.length, 'for receiver_id:', authUser.userId);
        console.log('[DEBUG_NOTIF] Fetched:', notifications.length, 'for receiver_id:', authUser.userId);

        // Count unread
        const [{ unreadCount }] = await query(
            'SELECT COUNT(*) as unreadCount FROM notifications WHERE receiver_id = ? AND is_read = FALSE',
            [authUser.userId]
        );

        return successResponse({ notifications, unreadCount });
    } catch (error) {
        console.error('Get notifications error:', error);
        return errorResponse('Failed to fetch notifications', 500);
    }
}

// POST /api/notifications - Create a notification
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        let body;
        try {
            body = await request.json();
        } catch (e) {
            return errorResponse('Invalid JSON body', 400);
        }

        // receiver_id is the target user
        const { receiver_id, type, title, message, link } = body;

        if (!receiver_id || !title) {
            return errorResponse('Receiver ID and title are required', 400);
        }

        // Insert notification
        // sender_id is the current authenticated user
        const result = await query(
            'INSERT INTO notifications (receiver_id, sender_id, type, title, message, link, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [receiver_id, authUser.userId, type || 'system', title, message || '', link || null]
        );

        return successResponse({ id: (result as any).insertId }, 'Notification created', 201);
    } catch (error) {
        console.error('Create notification error:', error);
        return errorResponse('Failed to send notification', 500);
    }
}
