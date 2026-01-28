const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function main() {
    console.log('Connecting to database...');
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    try {
        console.log('Checking users table for location column...');
        const [rows] = await pool.query('SHOW COLUMNS FROM users LIKE "location"');

        if (rows.length === 0) {
            console.log('Adding location column...');
            await pool.query('ALTER TABLE users ADD COLUMN location VARCHAR(255) DEFAULT NULL');
            console.log('Column location added successfully.');
        } else {
            console.log('Column location already exists.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
        console.log('Done.');
    }
}

main();
