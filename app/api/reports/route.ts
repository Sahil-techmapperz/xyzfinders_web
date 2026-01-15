import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/api-response';

// POST /api/reports - Create a report
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { product_id, user_id, reason, description } = body;

        if (!product_id && !user_id) {
            return errorResponse('Either product ID or user ID is required');
        }

        if (!reason) {
            return errorResponse('Reason is required');
        }

        const validReasons = ['spam', 'fraud', 'inappropriate', 'duplicate', 'other'];
        if (!validReasons.includes(reason)) {
            return errorResponse('Invalid reason');
        }

        // Create report
        await query(
            `INSERT INTO reports (product_id, user_id, reporter_id, reason, description, status, created_at, updated_at)
       VALUES (?, ?, NULL, ?, ?, 'pending', NOW(), NOW())`,
            [product_id || null, user_id || null, reason, description || null]
        );

        return successResponse(null, 'Report submitted successfully. We will review it soon.');
    } catch (error) {
        console.error('Create report error:', error);
        return errorResponse('Failed to create report', 500);
    }
}
