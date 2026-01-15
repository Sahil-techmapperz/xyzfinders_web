import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// POST /api/support/contact - Send contact message (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return errorResponse('All fields are required');
        }

        // Save contact message
        await query(
            `INSERT INTO contact_messages (name, email, subject, message, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
            [name, email, subject, message]
        );

        return successResponse(null, 'Message sent successfully. We will get back to you soon.');
    } catch (error) {
        console.error('Contact form error:', error);
        return errorResponse('Failed to send message', 500);
    }
}
