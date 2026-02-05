const mysql = require('mysql2/promise');
const https = require('https');
const http = require('http');

// Import the BEAUTY mock data
const MOCK_BEAUTY = [
    {
        id: 1,
        title: "Premium Bridal Makeup & Hair Styling Package",
        category: "Bridal Makeup",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop",
        description: "Complete bridal transformation with professional makeup artist. Includes pre-bridal consultation, trial makeup session, and final bridal makeup with hairstyling on the wedding day.",
        specs: {
            serviceFor: "Female",
            type: "Home Service",
            duration: "3-4 Hours",
            rating: "4.8/5"
        },
        price: "₹ 15,000/-",
        location: "South Delhi, New Delhi, Delhi",
        postedTime: "Posted 30 min ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Full Body Massage & Spa Treatment",
        category: "Spa & Massage",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        description: "Relaxing full body massage with aromatherapy oils. Includes steam bath and body scrub. Perfect for stress relief and muscle relaxation.",
        specs: {
            serviceFor: "All",
            type: "Salon",
            duration: "90 Minutes",
            rating: "4.6/5"
        },
        price: "₹ 2,500/-",
        location: "Hauz Khas, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Men's Grooming Package",
        category: "Men's Grooming",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
        description: "Complete grooming package for men including haircut, beard styling, facial, and head massage. Walk-in welcome.",
        specs: {
            serviceFor: "Male",
            type: "Salon",
            duration: "1 Hour",
            rating: "4.5/5"
        },
        price: "₹ 800/-",
        location: "CP, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "Hair Spa Treatment",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
        description: "Deep conditioning hair spa with protein treatment and scalp massage. Suitable for all hair types.",
        specs: {
            serviceFor: "All",
            type: "Salon",
            duration: "45 Minutes",
            rating: "4.7/5"
        },
        price: "₹ 1,200/-",
        location: "Dwarka, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 5,
        title: "Party Makeup",
        category: "Party Makeup",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
        description: "Glamorous party makeup with long-lasting products. Hair styling included. Touch-up kit provided.",
        specs: {
            serviceFor: "Female",
            type: "Home Service",
            duration: "2 Hours",
            rating: "4.9/5"
        },
        price: "₹ 3,500/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    }
];

// Function to download image and convert to buffer
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, (response) => {
            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', reject);
    });
}

// Function to parse price string to number
function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/₹|,|-|\/|\s/g, '').trim());
}

async function seedBeautyData() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    try {
        console.log('Connected to database successfully!\n');

        // Get Beauty category ID
        const [categories] = await connection.query(
            'SELECT id FROM categories WHERE slug = ? OR name = ?',
            ['beauty', 'Beauty']
        );

        if (categories.length === 0) {
            throw new Error('Beauty category not found in database');
        }

        const categoryId = categories[0].id;
        console.log(`Beauty category ID: ${categoryId}\n`);

        // Get a default user (seller) - using user_id 1 or first available user
        const [users] = await connection.query('SELECT id FROM users LIMIT 1');
        const userId = users.length > 0 ? users[0].id : 1;
        console.log(`Using user ID: ${userId}\n`);

        // Get a default location
        const [locations] = await connection.query('SELECT id FROM locations LIMIT 1');
        const locationId = locations.length > 0 ? locations[0].id : 1;
        console.log(`Using location ID: ${locationId}\n`);

        let insertedCount = 0;
        let skippedCount = 0;

        for (const item of MOCK_BEAUTY) {
            try {
                console.log(`Processing: ${item.title}...`);

                // Check if product already exists
                const [existing] = await connection.query(
                    'SELECT id FROM products WHERE title = ? AND category_id = ?',
                    [item.title, categoryId]
                );

                if (existing.length > 0) {
                    console.log(`  ⚠️  Skipped (already exists with ID: ${existing[0].id})\n`);
                    skippedCount++;
                    continue;
                }

                const price = parsePrice(item.price);

                // Prepare product_attributes JSON
                const productAttributes = {
                    category: item.category,
                    specs: item.specs,
                    location: item.location,
                    verified: item.verified,
                    premium: item.premium
                };

                // Insert product
                const [result] = await connection.query(
                    `INSERT INTO products (
                        user_id, category_id, location_id, title, description, 
                        product_attributes, price, condition, product_condition,
                        status, is_featured, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                    [
                        userId,
                        categoryId,
                        locationId,
                        item.title,
                        item.description,
                        JSON.stringify(productAttributes),
                        price,
                        'new',
                        'new',
                        'active',
                        item.premium ? 1 : 0
                    ]
                );

                const productId = result.insertId;
                console.log(`  ✓ Product inserted with ID: ${productId}`);

                // Download and insert image
                try {
                    console.log(`  Downloading image...`);
                    const imageBuffer = await downloadImage(item.image);

                    await connection.query(
                        `INSERT INTO product_images (
                            product_id, image_data, display_order, is_primary
                        ) VALUES (?, ?, ?, ?)`,
                        [productId, imageBuffer, 1, 1]
                    );

                    console.log(`  ✓ Image inserted (${(imageBuffer.length / 1024).toFixed(2)} KB)\n`);
                } catch (imgError) {
                    console.log(`  ⚠️  Failed to download/insert image: ${imgError.message}\n`);
                }

                insertedCount++;

            } catch (error) {
                console.error(`  ✗ Error processing ${item.title}:`, error.message, '\n');
            }
        }

        console.log('\n=== SEEDING SUMMARY ===');
        console.log(`Total items processed: ${MOCK_BEAUTY.length}`);
        console.log(`Successfully inserted: ${insertedCount}`);
        console.log(`Skipped (duplicates): ${skippedCount}`);
        console.log(`Errors: ${MOCK_BEAUTY.length - insertedCount - skippedCount}`);

    } catch (error) {
        console.error('Fatal error:', error.message);
        console.error(error.stack);
    } finally {
        await connection.end();
        console.log('\nDatabase connection closed.');
    }
}

// Run the script
seedBeautyData();
