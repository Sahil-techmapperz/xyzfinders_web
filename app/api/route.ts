import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        success: true,
        message: 'XYZ Finders API',
        version: '1.0.0',
        endpoints: {
            auth: [
                'POST /api/auth/register',
                'POST /api/auth/login',
                'GET /api/auth/me',
            ],
            products: [
                'GET /api/products',
                'POST /api/products',
                'GET /api/products/[id]',
                'PUT /api/products/[id]',
                'DELETE /api/products/[id]',
            ],
            categories: [
                'GET /api/categories',
                'GET /api/categories/[id]',
            ],
            locations: [
                'GET /api/locations/states',
                'GET /api/locations/cities',
            ],
            users: [
                'GET /api/users/profile',
                'PUT /api/users/profile',
                'GET /api/users/my-products',
            ],
            favorites: [
                'GET /api/favorites',
                'POST /api/favorites',
                'DELETE /api/favorites/[id]',
            ],
        },
    });
}
