const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function updateBuyersTable() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123'
    });

    try {
        console.log('Updating buyers table...');

        // Add phone column
        try {
            await connection.execute(`ALTER TABLE buyers ADD COLUMN phone VARCHAR(20) DEFAULT NULL`);
            console.log('Added phone column.');
        } catch (e) {
            console.log('Phone column might already exist:', e.message);
        }

        // Add location column
        try {
            await connection.execute(`ALTER TABLE buyers ADD COLUMN location VARCHAR(255) DEFAULT NULL`);
            console.log('Added location column.');
        } catch (e) {
            console.log('Location column might already exist:', e.message);
        }

        console.log('Buyers table update complete.');

    } catch (error) {
        console.error('Error updating buyers table:', error);
    } finally {
        await connection.end();
    }
}

updateBuyersTable();
