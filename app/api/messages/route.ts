import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/messages - Send a message
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const { product_id, receiver_id, message } = body;

        if (!product_id || !receiver_id || !message) {
            return errorResponse('Product ID, receiver ID, and message are required');
        }

        if (receiver_id === authUser.userId) {
            return errorResponse('Cannot send message to yourself');
        }

        // Insert message
        const result: any = await query(
            `INSERT INTO messages (product_id, sender_id, receiver_id, message, is_read, created_at, updated_at)
       VALUES (?, ?, ?, ?, 0, NOW(), NOW())`,
            [product_id, authUser.userId, receiver_id, message]
        );

        const messageId = result.insertId;

        // Fetch created message
        const newMessage = await query(
            `SELECT m.*, 
        p.title as product_title,
        sender.name as sender_name,
        receiver.name as receiver_name
       FROM messages m
       LEFT JOIN products p ON m.product_id = p.id
       LEFT JOIN users sender ON m.sender_id = sender.id
       LEFT JOIN users receiver ON m.receiver_id = receiver.id
       WHERE m.id = ?`,
            [messageId]
        );

        return successResponse(newMessage[0], 'Message sent successfully');
    } catch (error) {
        console.error('Send message error:', error);
        return errorResponse('Failed to send message', 500);
    }
}
