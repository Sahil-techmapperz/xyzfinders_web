/**
 * Image Utility Functions for Binary Storage
 * Handles conversion between binary data and base64 for API responses
 */

/**
 * Convert binary data (Buffer) to base64 string for JSON responses
 */
export function bufferToBase64(buffer: Buffer | null): string | null {
    if (!buffer) return null;
    return buffer.toString('base64');
}

/**
 * Convert base64 string to Buffer for database storage
 */
export function base64ToBuffer(base64: string): Buffer {
    return Buffer.from(base64, 'base64');
}

/**
 * Convert binary data to data URL for direct use in <img> tags
 */
export function bufferToDataUrl(buffer: Buffer | null, mimeType: string = 'image/jpeg'): string | null {
    if (!buffer) return null;
    const base64 = bufferToBase64(buffer);
    return `data:${mimeType};base64,${base64}`;
}

/**
 * Validate image file type
 */
export function isValidImageType(mimeType: string): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(mimeType.toLowerCase());
}

/**
 * Validate image size (max 1GB by default)
 */
export function isValidImageSize(sizeInBytes: number, maxSizeMB: number = 1024): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return sizeInBytes <= maxSizeBytes;
}

/**
 * Extract MIME type from data URL or file
 */
export function getMimeTypeFromDataUrl(dataUrl: string): string | null {
    const match = dataUrl.match(/^data:(image\/[a-z]+);base64,/);
    return match ? match[1] : null;
}

/**
 * Extract base64 data from data URL
 */
export function extractBase64FromDataUrl(dataUrl: string): string | null {
    const match = dataUrl.match(/^data:image\/[a-z]+;base64,(.+)$/);
    return match ? match[1] : null;
}

/**
 * Process uploaded image from FormData
 */
export async function processUploadedImage(file: File): Promise<{
    buffer: Buffer;
    mimeType: string;
    size: number;
    valid: boolean;
    error?: string;
}> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;
    const size = file.size;

    // Validate
    if (!isValidImageType(mimeType)) {
        return {
            buffer,
            mimeType,
            size,
            valid: false,
            error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP'
        };
    }

    if (!isValidImageSize(size)) {
        return {
            buffer,
            mimeType,
            size,
            valid: false,
            error: 'Image size exceeds 1GB limit'
        };
    }

    return {
        buffer,
        mimeType,
        size,
        valid: true
    };
}

/**
 * Format user object with profile image as base64
 */
export function formatUserWithImage(user: any): any {
    if (!user) return null;

    return {
        ...user,
        profile_image: user.profile_image
            ? bufferToBase64(user.profile_image)
            : null
    };
}

/**
 * Format product image object with binary data as base64
 */
export function formatProductImage(image: any): any {
    if (!image) return null;

    return {
        id: image.id,
        product_id: image.product_id,
        image_data: image.image_data
            ? bufferToBase64(image.image_data)
            : null,
        display_order: image.display_order,
        is_primary: image.is_primary,
        created_at: image.created_at
    };
}

/**
 * Format category object with icon/image as base64
 */
export function formatCategoryWithImages(category: any): any {
    if (!category) return null;

    return {
        ...category,
        icon: category.icon
            ? bufferToBase64(category.icon)
            : null,
        image: category.image
            ? bufferToBase64(category.image)
            : null
    };
}
