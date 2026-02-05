import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { successResponse, errorResponse, paginatedResponse, unauthorizedResponse } from '@/lib/api-response';
import { Product } from '@/types';

// GET /api/products - List all products with filters
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');
        const category_id = searchParams.get('category_id');
        const location_id = searchParams.get('location_id');
        const search = searchParams.get('search');
        const min_price = searchParams.get('min_price');
        const max_price = searchParams.get('max_price');
        const condition = searchParams.get('condition');
        const status = searchParams.get('status') || 'active';

        // Job-specific filters
        const job_type = searchParams.get('job_type');
        const experience = searchParams.get('experience');
        const min_salary = searchParams.get('min_salary');
        const work_mode = searchParams.get('work_mode');

        let sql = `
      SELECT p.*, 
        u.name as seller_name,
        c.name as category_name,
        l.name as city
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN locations l ON p.location_id = l.id
      WHERE p.status = ?
    `;
        const params: any[] = [status];

        if (category_id) {
            sql += ' AND p.category_id = ?';
            params.push(category_id);
        }

        if (location_id) {
            sql += ' AND p.location_id = ?';
            params.push(location_id);
        }

        if (search) {
            sql += ' AND (p.title LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (min_price) {
            sql += ' AND p.price >= ?';
            params.push(parseFloat(min_price));
        }

        if (max_price) {
            sql += ' AND p.price <= ?';
            params.push(parseFloat(max_price));
        }

        if (condition) {
            sql += ' AND p.condition = ?';
            params.push(condition);
        }

        // Job-specific filters using JSON queries
        if (job_type) {
            const types = job_type.split(',');
            sql += ' AND (';
            const typeConditions = types.map(() =>
                "JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.specs.type')) LIKE ?"
            ).join(' OR ');
            sql += typeConditions + ')';
            types.forEach(type => params.push(`%${type}%`));
        }

        if (experience) {
            const experiences = experience.split(',');
            sql += ' AND (';
            const expConditions = experiences.map(() =>
                "JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.specs.experience')) LIKE ?"
            ).join(' OR ');
            sql += expConditions + ')';
            experiences.forEach(exp => params.push(`%${exp}%`));
        }

        if (min_salary) {
            // Filter by price as a proxy for salary (in LPA * 100000)
            const salaryInRupees = parseFloat(min_salary) * 100000 / 12; // Convert LPA to monthly
            sql += ' AND p.price >= ?';
            params.push(salaryInRupees);
        }

        if (work_mode) {
            const modes = work_mode.split(',');
            sql += ' AND (';
            const modeConditions = modes.map(() =>
                "(JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.specs.type')) LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(p.product_attributes, '$.location')) LIKE ?)"
            ).join(' OR ');
            sql += modeConditions + ')';
            modes.forEach(mode => {
                params.push(`%${mode}%`);
                params.push(`%${mode}%`);
            });
        }

        // Count total
        const countSql = sql.replace(/SELECT p\.\*[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM');
        const countResult = await query<{ total: number }>(countSql, params);
        const total = countResult[0]?.total || 0;

        // Add ordering and pagination
        sql += ` ORDER BY p.created_at DESC LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`;

        const products = await query<Product>(sql, params);

        // Fetch images for all products
        if (products.length > 0) {
            const productIds = products.map(p => p.id);
            const placeholders = productIds.map(() => '?').join(',');

            const allImages = await query<{
                product_id: number;
                id: number;
                image_data: Buffer;
                display_order: number;
                is_primary: boolean;
            }>(
                `SELECT product_id, id, image_data, display_order, is_primary 
                 FROM product_images 
                 WHERE product_id IN (${placeholders})
                 ORDER BY product_id, is_primary DESC, display_order ASC`,
                productIds
            );

            // Group images by product_id and convert to base64
            const imagesByProduct = allImages.reduce((acc, img) => {
                if (!acc[img.product_id]) {
                    acc[img.product_id] = [];
                }
                acc[img.product_id].push({
                    id: img.id,
                    image: img.image_data.toString('base64'),
                    display_order: img.display_order,
                    is_primary: img.is_primary
                });
                return acc;
            }, {} as Record<number, any[]>);

            // Attach images to each product
            products.forEach(product => {
                (product as any).images = imagesByProduct[product.id] || [];
            });
        }

        return paginatedResponse(products, page, perPage, total);
    } catch (error) {
        console.error('Products list error:', error);
        return errorResponse('Failed to fetch products', 500);
    }
}

// POST /api/products - Create new product
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
            original_price,
            category_id,
            location_id,
            images,
            condition,
        } = body;

        // Validation
        if (!title || !description || !price || !category_id || !location_id) {
            return errorResponse('Required fields are missing');
        }

        // Insert product
        const result: any = await query(
            `INSERT INTO products (
        title, description, price, original_price, category_id, 
        user_id, location_id, \`condition\`, status, 
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
            [
                title,
                description,
                price,
                original_price || null,
                category_id,
                authUser.userId,
                location_id,
                condition || 'good',
            ]
        );

        const productId = result.insertId;

        // Fetch created product
        const product = await query<Product>(
            'SELECT * FROM products WHERE id = ?',
            [productId]
        );

        return successResponse(product[0], 'Product created successfully');
    } catch (error) {
        console.error('Create product error:', error);
        return errorResponse('Failed to create product', 500);
    }
}
