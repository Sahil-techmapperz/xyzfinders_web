import { NextRequest } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

// GET /api/seller/products/[id] - Get single product details
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await context.params;

        // Fetch product with location and category
        const products = await query<any>(
            `SELECT p.*, 
                    c.name as category_name,
                    l.name as location_name,
                    l.postal_code as postal_code,
                    ci.name as city_name,
                    s.name as state_name
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.id
             LEFT JOIN locations l ON p.location_id = l.id
             LEFT JOIN cities ci ON l.city_id = ci.id
             LEFT JOIN states s ON ci.state_id = s.id
             WHERE p.id = ? AND p.user_id = ?`,
            [id, authUser.userId]
        );

        if (products.length === 0) {
            return errorResponse('Product not found', 404);
        }

        const product = products[0];

        // Fetch images
        const images = await query<any>(
            'SELECT image_data FROM product_images WHERE product_id = ? ORDER BY display_order ASC',
            [product.id]
        );

        // Convert images to base64
        const processedImages = images.map((img: any) => {
            if (img.image_data) {
                const base64 = Buffer.from(img.image_data).toString('base64');
                return `data:image/jpeg;base64,${base64}`;
            }
            return null;
        }).filter(Boolean);

        // Parse product_attributes if it exists
        let parsedAttributes = {};
        if (product.product_attributes) {
            try {
                parsedAttributes = typeof product.product_attributes === 'string'
                    ? JSON.parse(product.product_attributes)
                    : product.product_attributes;

                // If specs object exists within product_attributes, extract its fields
                if (parsedAttributes && typeof parsedAttributes === 'object' && 'specs' in parsedAttributes) {
                    const specs = (parsedAttributes as any).specs;
                    // Merge specs fields into parsedAttributes for easy access
                    parsedAttributes = {
                        ...parsedAttributes,
                        ...(typeof specs === 'object' ? specs : {})
                    };
                }
            } catch (e) {
                console.error('Error parsing product_attributes:', e);
            }
        }

        return successResponse({
            ...product,
            ...parsedAttributes, // Merge attributes into the response for easy access
            images: processedImages
        });
    } catch (error: any) {
        console.error('Get product error:', error);
        return errorResponse('Failed to fetch product: ' + error.message, 500);
    }
}

// DELETE /api/seller/products/[id] - Delete a product
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // Correct type for Next.js 15+ dynamic routes
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await context.params;

        // Verify ownership
        const result: any = await query(
            'DELETE FROM products WHERE id = ? AND user_id = ?',
            [id, authUser.userId]
        );

        if (result.affectedRows === 0) {
            return errorResponse('Product not found or not authorized', 404);
        }

        return successResponse(null, 'Product deleted successfully');
    } catch (error: any) {
        console.error('Delete product error:', error);
        return errorResponse('Failed to delete product: ' + error.message, 500);
    }
}

// PATCH /api/seller/products/[id] - Update product details or status
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const authUser = getUserFromRequest(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const { id } = await context.params;
        const body = await request.json();

        // Check if it's a status-only update or a full detail update
        // Extract location fields separately so they don't go into product_attributes
        const { status, title, description, price, condition, images, city, state, landmark, pincode, ...otherFields } = body;

        // Verify ownership first
        const product = await queryOne<any>(
            'SELECT id FROM products WHERE id = ? AND user_id = ?',
            [id, authUser.userId]
        );

        if (!product) {
            return errorResponse('Product not found or not authorized', 404);
        }

        if (status && Object.keys(body).length === 1) {
            // Status-only update
            if (!['active', 'sold', 'inactive'].includes(status)) {
                return errorResponse('Invalid status');
            }
            await query(
                'UPDATE products SET status = ? WHERE id = ?',
                [status, id]
            );
            return successResponse(null, 'Product status updated successfully');
        }

        // Handle location updates if city/state/landmark/pincode are provided
        let location_id = null;
        if (city || state || landmark || pincode) {

            // Find or create state
            let stateRecord = await queryOne<{ id: number }>('SELECT id FROM states WHERE name = ? LIMIT 1', [state]);
            if (!stateRecord) {
                const result: any = await query('INSERT INTO states (name, created_at) VALUES (?, NOW())', [state]);
                stateRecord = { id: result.insertId };
            }
            const stateId = stateRecord.id;

            // Find or create city
            let cityRecord = await queryOne<{ id: number }>('SELECT id FROM cities WHERE state_id = ? AND name = ? LIMIT 1', [stateId, city]);
            if (!cityRecord) {
                const result: any = await query('INSERT INTO cities (state_id, name, created_at) VALUES (?, ?, NOW())', [stateId, city]);
                cityRecord = { id: result.insertId };
            }
            const cityId = cityRecord.id;

            // Find or create location
            const locationName = landmark || city;
            let locationRecord = await queryOne<{ id: number; postal_code?: string }>('SELECT id, postal_code FROM locations WHERE city_id = ? AND name = ? LIMIT 1', [cityId, locationName]);

            if (!locationRecord) {
                const result: any = await query(
                    'INSERT INTO locations (city_id, name, postal_code, created_at) VALUES (?, ?, ?, NOW())',
                    [cityId, locationName, pincode || null]
                );
                location_id = result.insertId;
            } else {
                location_id = locationRecord.id;
                // Update postal_code if it changed
                if (pincode && locationRecord.postal_code !== pincode) {
                    await query('UPDATE locations SET postal_code = ? WHERE id = ?', [pincode, location_id]);
                }
            }

            // Update product's location_id
            await query('UPDATE products SET location_id = ? WHERE id = ?', [location_id, id]);
        }


        // Full update logic
        const updateFields: string[] = [];
        const queryParams: any[] = [];

        // Core fields that have dedicated columns
        const coreFieldMapping: Record<string, string> = {
            title: 'title',
            description: 'description',
            price: 'price',
            condition: '`condition`', // Escaped because it's a reserved keyword
            status: 'status'
        };

        // Update core fields
        for (const [bodyKey, dbColumn] of Object.entries(coreFieldMapping)) {
            if (body[bodyKey] !== undefined) {
                updateFields.push(`${dbColumn} = ?`);
                queryParams.push(body[bodyKey]);
            }
        }

        // Build product_attributes JSON from remaining fields
        const productAttributes: any = {};
        for (const [key, value] of Object.entries(otherFields)) {
            if (value !== undefined && value !== null && value !== '' && key !== 'images') {
                productAttributes[key] = value;
            }
        }

        // Add product_attributes to update if there are any
        if (Object.keys(productAttributes).length > 0) {
            updateFields.push('product_attributes = ?');
            queryParams.push(JSON.stringify(productAttributes));
        }

        if (updateFields.length > 0) {
            updateFields.push('updated_at = NOW()');
            const sql = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
            queryParams.push(id);
            await query(sql, queryParams);
        }

        // Update images if provided
        if (images && Array.isArray(images)) {
            // Delete old images
            await query('DELETE FROM product_images WHERE product_id = ?', [id]);

            // Insert new images
            for (let i = 0; i < images.length; i++) {
                const imageBase64 = images[i];
                // Check if it's already a data URL or just base64
                const base64Data = imageBase64.startsWith('data:')
                    ? imageBase64.replace(/^data:image\/\w+;base64,/, '')
                    : imageBase64;

                try {
                    const imageBuffer = Buffer.from(base64Data, 'base64');
                    await query(
                        `INSERT INTO product_images (
                            product_id, image_data, display_order, is_primary, created_at
                        ) VALUES (?, ?, ?, ?, NOW())`,
                        [id, imageBuffer, i, i === 0 ? 1 : 0]
                    );
                } catch (e) {
                    console.error('Error processing image during update:', e);
                }
            }
        }

        return successResponse(null, 'Product updated successfully');
    } catch (error: any) {
        console.error('Update product error:', error);
        return errorResponse('Failed to update product: ' + error.message, 500);
    }
}
