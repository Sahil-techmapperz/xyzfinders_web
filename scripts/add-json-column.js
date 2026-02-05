/**
 * Add product_attributes JSON column to products table
 * Usage: node scripts/add-json-column.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function addJsonColumn() {
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

        // Check if column already exists
        const [columns] = await connection.execute(
            "SHOW COLUMNS FROM products WHERE Field = 'product_attributes'"
        );

        if (columns.length > 0) {
            console.log('⚠️  Column product_attributes already exists');
        } else {
            // Add the JSON column
            await connection.execute(`
                ALTER TABLE products 
                ADD COLUMN product_attributes JSON DEFAULT NULL 
                AFTER description
            `);
            console.log('✓ Added product_attributes JSON column');
        }

        // Verify
        const [result] = await connection.execute('DESCRIBE products');
        console.log('\n📋 Products table structure:');
        console.table(result);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n✓ Database connection closed');
        }
    }
}

addJsonColumn();
