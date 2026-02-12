import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/messages/conversations - Get all conversations
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        // Get conversations with latest message
        const conversations = await query(
            `SELECT 
        m.*,
        p.id as product_id,
        p.title as product_title,
        p.price as product_price,
        (SELECT image_data FROM product_images WHERE product_id = p.id ORDER BY is_primary DESC, display_order ASC LIMIT 1) as product_image_data,
        sender.id as sender_id,
        sender.name as sender_name,
        receiver.id as receiver_id,
        receiver.name as receiver_name,
        (SELECT COUNT(*) FROM messages 
         WHERE product_id = m.product_id 
         AND ((sender_id = m.sender_id AND receiver_id = m.receiver_id) 
              OR (sender_id = m.receiver_id AND receiver_id = m.sender_id))
         AND receiver_id = ? 
         AND is_read = 0) as unread_count
       FROM messages m
       INNER JOIN (
         SELECT product_id, 
                MAX(id) as latest_message_id
         FROM messages
         WHERE sender_id = ? OR receiver_id = ?
         GROUP BY product_id, 
                  CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END
       ) latest ON m.id = latest.latest_message_id
       LEFT JOIN products p ON m.product_id = p.id
       LEFT JOIN users sender ON m.sender_id = sender.id
       LEFT JOIN users receiver ON m.receiver_id = receiver.id
       ORDER BY m.created_at DESC`,
            [authUser.userId, authUser.userId, authUser.userId, authUser.userId]
        );

        // Process conversations to handle image buffer
        const processedConversations = conversations.map((c: any) => ({
            ...c,
            product_image: c.product_image_data ? c.product_image_data.toString('base64') : null,
            product_image_data: undefined // Remove buffer from response
        }));

        return successResponse(processedConversations);
    } catch (error) {
        console.error('Get conversations error:', error);
        return errorResponse('Failed to fetch conversations', 500);
    }
}
