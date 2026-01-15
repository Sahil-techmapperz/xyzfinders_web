import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/admin/stats - Get admin dashboard stats
export async function GET(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser || authUser.user_type !== 'admin') {
            return unauthorizedResponse('Admin access required');
        }

        // Get various statistics
        const totalUsers = await queryOne<{ count: number }>(
            'SELECT COUNT(*) as count FROM users'
        );

        const totalProducts = await queryOne<{ count: number }>(
            'SELECT COUNT(*) as count FROM products'
        );

        const activeProducts = await queryOne<{ count: number }>(
            "SELECT COUNT(*) as count FROM products WHERE status = 'active'"
        );

        const pendingReports = await queryOne<{ count: number }>(
            "SELECT COUNT(*) as count FROM reports WHERE status = 'pending'"
        );

        const totalRevenue = await queryOne<{ total: number }>(
            'SELECT COALESCE(SUM(amount), 0) as total FROM subscriptions WHERE status = ?',
            ['completed']
        );

        return successResponse({
            total_users: totalUsers?.count || 0,
            total_products: totalProducts?.count || 0,
            active_products: activeProducts?.count || 0,
            pending_reports: pendingReports?.count || 0,
            total_revenue: totalRevenue?.total || 0,
        });
    } catch (error) {
        console.error('Get admin stats error:', error);
        return errorResponse('Failed to fetch statistics', 500);
    }
}
