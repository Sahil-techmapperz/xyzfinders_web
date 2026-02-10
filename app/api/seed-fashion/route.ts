import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        console.log('Starting Fashion seed...');

        // 1. Get or Create Category
        let categoryId;
        const categoryResult = await query<any>(`SELECT id FROM categories WHERE name = 'Fashion'`);
        if (categoryResult && categoryResult.length > 0) {
            categoryId = categoryResult[0].id;
        } else {
            const result: any = await query(`INSERT INTO categories (name, slug, icon, is_featured, created_at, updated_at) VALUES ('Fashion', 'fashion', 'ri-t-shirt-2-line', 1, NOW(), NOW())`);
            categoryId = result.insertId;
        }

        // 2. Get existing location (just use any location in the database)
        const locationResult = await query<any>(`SELECT id FROM locations LIMIT 1`);
        if (!locationResult || locationResult.length === 0) {
            return NextResponse.json({ success: false, error: 'No locations found in database. Please add locations first.' }, { status: 400 });
        }
        const locationId = locationResult[0].id;

        // 3. Get existing user (just use any user in the database)
        const userResult = await query<any>(`SELECT id FROM users LIMIT 1`);
        if (!userResult || userResult.length === 0) {
            return NextResponse.json({ success: false, error: 'No users found in database. Please add users first.' }, { status: 400 });
        }
        const userId = userResult[0].id;

        // 4. Mock Data
        const MOCK_FASHION = [
            {
                title: "Zara Man Slim Fit Blazer - Navy Blue",
                category_name: "Men",
                subcategory: "Clothing",
                brand: "Zara",
                image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=1974&auto=format&fit=crop"
                ],
                description: "Classic navy blue blazer from Zara. Slim fit, perfect for formal occasions or office wear. Worn only twice.",
                specs: {
                    size: "40 (L)",
                    condition: "Like New",
                    material: "Wool Blend",
                    color: "Navy Blue"
                },
                price: 2500.00,
                location_name: "Vasant Kunj, New Delhi",
                condition: "like_new",
                is_featured: true
            },
            {
                title: "H&M Floral Summer Dress",
                category_name: "Women",
                subcategory: "Clothing",
                brand: "H&M",
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop"
                ],
                description: "Beautiful floral summer dress. Lightweight and comfortable. Perfect for casual outings.",
                specs: {
                    size: "M",
                    condition: "New with Tags",
                    material: "Cotton",
                    color: "Multi"
                },
                price: 1200.00,
                location_name: "Saket, New Delhi",
                condition: "new",
                is_featured: false
            },
            {
                title: "Nike Air Jordan 1 High - Chicago Lost & Found",
                category_name: "Men",
                subcategory: "Footwear",
                brand: "Nike",
                image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop"
                ],
                description: "Authentic Air Jordan 1s. Limited edition. Box and bill available.",
                specs: {
                    size: "UK 9",
                    condition: "Brand New",
                    material: "Leather",
                    color: "Red/White/Black"
                },
                price: 35000.00,
                location_name: "Connaught Place, New Delhi",
                condition: "new",
                is_featured: true
            },
            {
                title: "Louis Vuitton Neverfull MM Tote Bag",
                category_name: "Women",
                subcategory: "Accessories",
                brand: "Louis Vuitton",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop"
                ],
                description: "Original LV Tote bag. Gently used. Comes with dust bag and authenticity card.",
                specs: {
                    size: "Medium",
                    condition: "Good",
                    material: "Canvas",
                    color: "Brown Monogram"
                },
                price: 85000.00,
                location_name: "Greater Kailash, New Delhi",
                condition: "good",
                is_featured: true
            },
            {
                title: "Ray-Ban Aviator Sunglasses",
                category_name: "Unisex",
                subcategory: "Accessories",
                brand: "Ray-Ban",
                image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop"
                ],
                description: "Classic gold frame aviators. Scratch-free lenses. Original case included.",
                specs: {
                    size: "Standard",
                    condition: "Excellent",
                    material: "Metal",
                    color: "Gold/Green"
                },
                price: 4500.00,
                location_name: "Dwarka, New Delhi",
                condition: "like_new",
                is_featured: false
            }
        ];

        // 5. Insert Data
        let insertedCount = 0;
        for (const item of MOCK_FASHION) {

            // Prepare attributes JSON
            const attributes = {
                specs: item.specs,
                brand: item.brand,
                verified: true,
                premium: item.is_featured,
                category: item.category_name,
                subcategory: item.subcategory,
                location: item.location_name
            };

            const result: any = await query(
                `INSERT INTO products (
                    title, description, price, category_id, user_id, location_id, 
                    \`condition\`, status, is_featured, product_attributes, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, NOW(), NOW())`,
                [
                    item.title,
                    item.description,
                    item.price,
                    categoryId,
                    userId,
                    locationId,
                    item.condition,
                    item.is_featured ? 1 : 0,
                    JSON.stringify(attributes)
                ]
            );

            const productId = result.insertId;
            insertedCount++;

            // Insert Images
            let displayOrder = 1;
            for (const imageUrl of item.images) {
                try {
                    const response = await fetch(imageUrl);
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);

                    await query(
                        `INSERT INTO product_images (product_id, image_data, display_order, is_primary, created_at)
                         VALUES (?, ?, ?, ?, NOW())`,
                        [productId, buffer, displayOrder, displayOrder === 1 ? 1 : 0]
                    );
                    displayOrder++;
                } catch (imgError) {
                    console.error(`Failed to fetch image for ${item.title}:`, imgError);
                }
            }
        }

        return NextResponse.json({ success: true, message: `Seeded ${insertedCount} fashion items successfully.` });

    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
