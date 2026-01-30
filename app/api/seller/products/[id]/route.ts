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

        return successResponse({
            ...product,
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
        const { status, title, description, price, condition, images, phone, brand, model } = body;

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
            if (!['active', 'sold', 'details_archived'].includes(status)) {
                return errorResponse('Invalid status');
            }
            await query(
                'UPDATE products SET status = ? WHERE id = ?',
                [status, id]
            );
            return successResponse(null, 'Product status updated successfully');
        }

        // Full update logic
        const updateFields: string[] = [];
        const queryParams: any[] = [];

        const fieldMapping: Record<string, string> = {
            title: 'title',
            price: 'price',
            condition: 'condition',
            status: 'status',
            phone: 'contact_phone',
            description: 'description',
            category: 'subcategory_name',
            brand: 'brand',
            model: 'model',
            year: 'year',
            kmDriven: 'km_driven',
            fuelType: 'fuel_type',
            transmission: 'transmission',
            owners: 'owners',
            type: 'property_type',
            bedrooms: 'bedrooms',
            bathrooms: 'bathrooms',
            furnishing: 'furnishing',
            constructionStatus: 'construction_status',
            listedBy: 'listed_by',
            superBuiltupArea: 'super_builtup_area',
            carpetArea: 'carpet_area',
            totalFloors: 'total_floors',
            floorNo: 'floor_no',
            salaryType: 'salary_period',
            jobType: 'job_type',
            companyName: 'company_name',
            experienceLevel: 'experience_level',
            eventDate: 'event_date',
            eventTime: 'event_time',
            venue: 'venue_name',
            organizer: 'organizer_name',
            breed: 'breed',
            age: 'age',
            gender: 'gender',
            color: 'color',
            vaccinated: 'vaccinated'
        };

        for (const [bodyKey, dbColumn] of Object.entries(fieldMapping)) {
            if (body[bodyKey] !== undefined) {
                updateFields.push(`${dbColumn} = ?`);
                queryParams.push(body[bodyKey]);
            }
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
