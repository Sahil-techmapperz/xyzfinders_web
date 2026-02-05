/**
 * Seed Script for Multiple Categories
 * 
 * This script will:
 * 1. DELETE all existing products for BEAUTY, ELECTRONICS, FURNITURE, JOBS categories
 * 2. INSERT fresh data from mock-data.ts for these categories
 * 
 * Usage: node scripts/seed-categories.js
 */

const mysql = require('mysql2/promise');
const https = require('https');
const http = require('http');

// IMPORTANT: Copy the mock data from mock-data.ts here
// This is a Node.js file, so we need to use require/module.exports syntax

const MOCK_DATA = {
    BEAUTY: require('../data-for-seeding/beauty.json'),
    ELECTRONICS: require('../data-for-seeding/electronics.json'),
    FURNITURE: require('../data-for-seeding/furniture.json'),
    JOBS: require('../data-for-seeding/jobs.json')
};

// Category mapping
const CATEGORY_MAPPING = {
    BEAUTY: 'beauty',
    ELECTRONICS: 'electronics',
    FURNITURE: 'furniture',
    JOBS: 'jobs'
};

// Function to download image and convert to buffer
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const timeout = setTimeout(() => reject(new Error('Download timeout')), 30000);

        protocol.get(url, (response) => {
            clearTimeout(timeout);
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

// Function to parse price string to number
function parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    return parseFloat(String(priceStr).replace(/₹|,|-|\/|\s/g, '').trim()) || 0;
}

async function seedCategories() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    try {
        console.log('✓ Connected to database successfully!\n');

        // Get default user and location
        const [users] = await connection.query('SELECT id FROM users LIMIT 1');
        const userId = users.length > 0 ? users[0].id : 1;

        const [locations] = await connection.query('SELECT id FROM locations LIMIT 1');
        const locationId = locations.length > 0 ? locations[0].id : 1;

        console.log(`Using user ID: ${userId}, location ID: ${locationId}\n`);

        const stats = {
            deleted: 0,
            inserted: 0,
            errors: 0
        };

        // Process each category
        for (const [categoryName, categorySlug] of Object.entries(CATEGORY_MAPPING)) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`PROCESSING CATEGORY: ${categoryName}`);
            console.log(`${'='.repeat(60)}\n`);

            try {
                // Get category ID
                const [categories] = await connection.query(
                    'SELECT id FROM categories WHERE slug = ? OR name = ?',
                    [categorySlug, categoryName]
                );

                if (categories.length === 0) {
                    console.log(`⚠️  Category '${categoryName}' not found in database, skipping...\n`);
                    continue;
                }

                const categoryId = categories[0].id;
                console.log(`✓ Category ID: ${categoryId}`);

                // STEP 1: DELETE existing products for this category
                console.log(`\n🗑️  Deleting existing products in category '${categoryName}'...`);

                const [deleteResult] = await connection.query(
                    'DELETE FROM products WHERE category_id = ?',
                    [categoryId]
                );

                const deletedCount = deleteResult.affectedRows;
                stats.deleted += deletedCount;
                console.log(`✓ Deleted ${deletedCount} existing products\n`);

                // STEP 2: INSERT new products from mock data
                const mockData = MOCK_DATA[categoryName];

                if (!mockData || !Array.isArray(mockData) || mockData.length === 0) {
                    console.log(`⚠️  No mock data found for ${categoryName}, skipping insertion...\n`);
                    continue;
                }

                console.log(`📦 Inserting ${mockData.length} products from mock data...\n`);

                for (let i = 0; i < mockData.length; i++) {
                    const item = mockData[i];

                    try {
                        console.log(`  [${i + 1}/${mockData.length}] ${item.title}...`);

                        const price = parsePrice(item.price || item.fees || item.salary || '0');

                        // Prepare product_attributes JSON
                        const productAttributes = { ...item };
                        delete productAttributes.id;
                        delete productAttributes.title;
                        delete productAttributes.description;
                        delete productAttributes.price;
                        delete productAttributes.fees;
                        delete productAttributes.salary;

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
                                item.description || '',
                                JSON.stringify(productAttributes),
                                price,
                                'new',
                                'new',
                                'active',
                                item.premium ? 1 : 0
                            ]
                        );

                        const productId = result.insertId;
                        console.log(`    ✓ Product inserted (ID: ${productId})`);

                        // Download and insert image if available
                        const imageUrl = item.image || item.img;
                        if (imageUrl) {
                            try {
                                const imageBuffer = await downloadImage(imageUrl);

                                await connection.query(
                                    `INSERT INTO product_images (
                                        product_id, image_data, display_order, is_primary
                                    ) VALUES (?, ?, ?, ?)`,
                                    [productId, imageBuffer, 1, 1]
                                );

                                console.log(`    ✓ Image inserted (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
                            } catch (imgError) {
                                console.log(`    ⚠️  Image download failed: ${imgError.message}`);
                            }
                        }

                        stats.inserted++;

                    } catch (itemError) {
                        console.error(`    ✗ Error: ${itemError.message}`);
                        stats.errors++;
                    }
                }

            } catch (categoryError) {
                console.error(`✗ Category error: ${categoryError.message}\n`);
                stats.errors++;
            }
        }

        // Print summary
        console.log(`\n${'='.repeat(60)}`);
        console.log('SEEDING SUMMARY');
        console.log(`${'='.repeat(60)}`);
        console.log(`Total products deleted:  ${stats.deleted}`);
        console.log(`Total products inserted: ${stats.inserted}`);
        console.log(`Total errors:            ${stats.errors}`);
        console.log(`${'='.repeat(60)}\n`);

    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        console.error(error.stack);
    } finally {
        await connection.end();
        console.log('✓ Database connection closed.\n');
    }
}

// Run the script
console.log('Starting category seeding process...\n');
seedCategories();
