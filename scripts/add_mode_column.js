const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function addModeColumn() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123'
    });

    try {
        console.log('Updating users table...');

        // Add current_mode column
        try {
            // Using ENUM for strict mode definition
            await connection.execute(`
                ALTER TABLE users 
                ADD COLUMN current_mode ENUM('buyer', 'seller', 'admin') DEFAULT 'buyer'
            `);
            console.log('Added current_mode column.');
        } catch (e) {
            console.log('Error adding current_mode (might already exist):', e.message);
        }

        console.log('Users table update complete.');

    } catch (error) {
        console.error('Error updating users table:', error);
    } finally {
        await connection.end();
    }
}

addModeColumn();
