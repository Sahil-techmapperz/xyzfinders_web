const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    console.log('Starting migration...');

    const config = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    };

    console.log('Connecting to database:', config.database);

    try {
        const connection = await mysql.createConnection(config);

        console.log('Connected. Checking for google_id column...');

        const [columns] = await connection.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'google_id'
        `, [config.database]);

        if (columns.length > 0) {
            console.log('Column google_id already exists. Skipping add.');
        } else {
            console.log('Adding google_id and avatar columns...');
            await connection.execute(`
                ALTER TABLE users 
                ADD COLUMN google_id VARCHAR(255) NULL UNIQUE AFTER email,
                ADD COLUMN avatar TEXT NULL AFTER google_id
            `);
            console.log('Columns added successfully.');
        }

        await connection.end();
        console.log('Migration complete.');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
