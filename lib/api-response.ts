import { NextResponse } from 'next/server';

export function successResponse<T = any>(data: T, message?: string, status: number = 200) {
    return NextResponse.json({
        success: true,
        message,
        data,
    }, { status });
}

export function errorResponse(error: string, statusCode: number = 400) {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status: statusCode }
    );
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
    return errorResponse(message, 401);
}

export function notFoundResponse(message: string = 'Resource not found') {
    return errorResponse(message, 404);
}

export function serverErrorResponse(message: string = 'Internal server error') {
    return errorResponse(message, 500);
}

export function paginatedResponse<T = any>(
    data: T[],
    page: number,
    perPage: number,
    total: number
) {
    return NextResponse.json({
        success: true,
        data,
        pagination: {
            current_page: page,
            per_page: perPage,
            total,
            total_pages: Math.ceil(total / perPage),
        },
    });
}
