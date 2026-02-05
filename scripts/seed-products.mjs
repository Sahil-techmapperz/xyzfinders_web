/**
 * Script to seed mock products data into database
 * Usage: node scripts/seed-products.mjs
 * 
 * Note: This is an ES Module (.mjs) to support import statements
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import {
    MOCK_PROPERTIES,
    MOCK_AUTOMOBILES,
    MOCK_MOBILES,
    MOCK_PETS,
    MOCK_EDUCATION,
    MOCK_EVENTS,
    MOCK_SERVICES
} from '../data/mock-data.ts';

dotenv.config({ path: '.env.local' });

// Helper to download and convert image to base64
async function urlToBase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn(`Failed to fetch image: ${url}`);
            return null;
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64');
    } catch (error) {
        console.warn(`Error fetching image ${url}:`, error.message);
        return null;
    }
}

// Category name to ID mapping (based on seeded categories)
const CATEGORY_MAP = {
    'Real Estate': 1,
    'Automobiles': 2,
    'Mobiles': 3,
    'Pets & Animals Accessories': 8,
    'Learning & Education': 9,
    'Local Events': 10,
    'Services': 11
};

// Default location ID (you may need to adjust this)
const DEFAULT_LOCATION_ID = 1;
const DEFAULT_USER_ID = 1; // Assuming a default seller

async function seedProducts() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'marketplace_db'
        });

        console.log('✓ Connected to database');

        // Delete existing products
        await connection.execute('DELETE FROM product_images');
        await connection.execute('DELETE FROM products');
        await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
        console.log('✓ Cleared existing products');

        let insertedCount = 0;

        // Helper function to insert product
        const insertProduct = async (data, categoryId, type) => {
            let price = 0;

            // Parse price from various formats
            if (data.price) {
                const priceStr = typeof data.price === 'string' ? data.price : String(data.price);
                price = parseFloat(priceStr.replace(/[₹,\/\-\s]/g, '').replace('onwards', '').trim()) || 0;
            } else if (data.fees) {
                const feesStr = typeof data.fees === 'string' ? data.fees : String(data.fees);
                price = parseFloat(feesStr.replace(/[₹,\/\-\s]/g, '').trim()) || 0;
            }

            const insertQuery = `
                INSERT INTO products (
                    user_id, category_id, location_id, title, description, 
                    price, \`condition\`, status, is_featured, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const description = data.description || data.desc || '';
            const [result] = await connection.execute(insertQuery, [
                DEFAULT_USER_ID,
                categoryId,
                DEFAULT_LOCATION_ID,
                data.title,
                description,
                price,
                'used',
                'active',
                data.premium ? 1 : 0
            ]);

            const productId = result.insertId;

            // Insert product image if available
            if (data.image) {
                console.log(`  Downloading image for: ${data.title.substring(0, 40)}...`);
                const base64Image = await urlToBase64(data.image);

                if (base64Image) {
                    const imageQuery = `
                        INSERT INTO product_images (
                            product_id, image_data, display_order, is_primary, created_at
                        ) VALUES (?, ?, ?, ?, NOW())
                    `;
                    await connection.execute(imageQuery, [productId, base64Image, 0, 1]);
                }
            }

            insertedCount++;
            console.log(`  ✓ Inserted: ${data.title}`);
        };

        // Insert Real Estate
        console.log('\n📦 Inserting Real Estate properties...');
        for (const property of MOCK_PROPERTIES) {
            await insertProduct(property, CATEGORY_MAP['Real Estate'], 'property');
        }

        // Insert Automobiles
        console.log('\n🚗 Inserting Automobiles...');
        for (const auto of MOCK_AUTOMOBILES) {
            await insertProduct(auto, CATEGORY_MAP['Automobiles'], 'automobile');
        }

        // Insert Mobiles
        console.log('\n📱 Inserting Mobiles...');
        for (const mobile of MOCK_MOBILES) {
            await insertProduct(mobile, CATEGORY_MAP['Mobiles'], 'mobile');
        }

        // Insert Pets
        console.log('\n🐾 Inserting Pets & Accessories...');
        for (const pet of MOCK_PETS) {
            await insertProduct(pet, CATEGORY_MAP['Pets & Animals Accessories'], 'pet');
        }

        // Insert Education
        console.log('\n📚 Inserting Education listings...');
        for (const edu of MOCK_EDUCATION) {
            await insertProduct(edu, CATEGORY_MAP['Learning & Education'], 'education');
        }

        // Insert Events
        console.log('\n🎉 Inserting Events...');
        for (const event of MOCK_EVENTS) {
            await insertProduct(event, CATEGORY_MAP['Local Events'], 'event');
        }

        // Insert Services
        console.log('\n🔧 Inserting Services...');
        for (const service of MOCK_SERVICES) {
            await insertProduct(service, CATEGORY_MAP['Services'], 'service');
        }

        console.log(`\n✅ Successfully inserted ${insertedCount} products with images!`);

        // Verify
        const [products] = await connection.execute(
            'SELECT p.id, p.title, c.name as category, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id LIMIT 10'
        );

        console.log('\n📋 Sample products in database:');
        console.table(products);

        const [imageCount] = await connection.execute('SELECT COUNT(*) as count FROM product_images');
        console.log(`\n🖼️  Total images: ${imageCount[0].count}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n✓ Database connection closed');
        }
    }
}

// Run the script
seedProducts();
