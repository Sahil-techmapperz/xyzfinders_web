import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// POST /api/seller/products/create - Create new product
export async function POST(request: NextRequest) {
    try {
        const authUser = getUserFromRequest(request);

        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const {
            title,
            description,
            price,
            category,
            city,
            state,
            landmark,
            condition,
            images,
            // Category-specific fields that will go into product_attributes
            ...categorySpecificFields
        } = body;

        // Validation
        if (!title || !description || !price || !category || !city || !state) {
            return errorResponse('Required fields are missing');
        }

        // Find or create state
        let stateRecord = await queryOne<{ id: number; name: string }>(
            'SELECT * FROM states WHERE name = ? LIMIT 1',
            [state]
        );

        if (!stateRecord) {
            const code = state.substring(0, 3).toUpperCase();
            const result: any = await query(
                'INSERT INTO states (name, code, created_at) VALUES (?, ?, NOW())',
                [state, code]
            );
            stateRecord = await queryOne<{ id: number; name: string }>(
                'SELECT * FROM states WHERE id = ?',
                [result.insertId]
            );
        }

        const stateId = stateRecord!.id;

        // Find or create city
        let cityRecord = await queryOne<{ id: number; state_id: number; name: string }>(
            'SELECT * FROM cities WHERE state_id = ? AND name = ? LIMIT 1',
            [stateId, city]
        );

        if (!cityRecord) {
            const result: any = await query(
                'INSERT INTO cities (state_id, name, created_at) VALUES (?, ?, NOW())',
                [stateId, city]
            );
            cityRecord = await queryOne<{ id: number; state_id: number; name: string }>(
                'SELECT * FROM cities WHERE id = ?',
                [result.insertId]
            );
        }

        const cityId = cityRecord!.id;

        const locationName = landmark || city;

        // Find or create location
        let locationRecord = await queryOne<{ id: number; city_id: number; name: string; postal_code?: string }>(
            'SELECT * FROM locations WHERE city_id = ? AND name = ? LIMIT 1',
            [cityId, locationName]
        );

        if (!locationRecord) {
            const result: any = await query(
                'INSERT INTO locations (city_id, name, postal_code, created_at) VALUES (?, ?, ?, NOW())',
                [cityId, locationName, body.pincode || null]
            );
            locationRecord = await queryOne<{ id: number; city_id: number; name: string; postal_code?: string }>(
                'SELECT * FROM locations WHERE id = ?',
                [result.insertId]
            );
        } else if (body.pincode && locationRecord.postal_code !== body.pincode) {
            // Update postal_code if it changed
            await query(
                'UPDATE locations SET postal_code = ? WHERE id = ?',
                [body.pincode, locationRecord.id]
            );
        }

        const location_id = locationRecord!.id;

        // Find category ID by name (approximate match)
        const categories = await query<{ id: number; name: string }>(
            'SELECT id, name FROM categories WHERE name LIKE ? LIMIT 1',
            [`%${category}%`]
        );

        let category_id = 1; // Default category
        if (categories.length > 0) {
            category_id = categories[0].id;
        }

        // Build product_attributes JSON with category-specific fields
        const productAttributes = {
            ...categorySpecificFields,
            location: landmark || city // Include location in attributes for easier filtering
        };

        // Remove undefined/null values from attributes
        Object.keys(productAttributes).forEach(key => {
            if (productAttributes[key] === undefined || productAttributes[key] === null || productAttributes[key] === '') {
                delete productAttributes[key];
            }
        });

        // Insert product
        const result: any = await query(
            `INSERT INTO products (
                title, description, price, category_id, 
                user_id, location_id, \`condition\`, product_attributes,
                status, is_featured, views,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', 0, 0, NOW(), NOW())`,
            [
                title,
                description,
                parseFloat(price),
                category_id,
                authUser.userId,
                location_id,
                condition || 'good',
                JSON.stringify(productAttributes)
            ]
        );

        const productId = result.insertId;

        // Insert images if provided
        if (images && Array.isArray(images) && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const imageBase64 = images[i];
                // Remove data URL prefix if present
                const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
                const imageBuffer = Buffer.from(base64Data, 'base64');

                await query(
                    `INSERT INTO product_images (
                        product_id, image_data, display_order, is_primary, created_at
                    ) VALUES (?, ?, ?, ?, NOW())`,
                    [productId, imageBuffer, i, i === 0 ? 1 : 0]
                );
            }
        }

        // Fetch created product
        const product = await query(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        return successResponse(product[0], 'Product created successfully');
    } catch (error: any) {
        console.error('Create product error:', error);
        return errorResponse('Failed to create product: ' + error.message, 500);
    }
}
