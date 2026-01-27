import mysql from 'mysql2/promise';

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

        console.log('Connected. Checking for facebook_id and apple_id columns...');

        // Check for facebook_id
        const [fbColumns] = await connection.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'facebook_id'
        `, [config.database]);

        if ((fbColumns as any[]).length > 0) {
            console.log('Column facebook_id already exists.');
        } else {
            console.log('Adding facebook_id column...');
            await connection.execute(`
                ALTER TABLE users 
                ADD COLUMN facebook_id VARCHAR(255) NULL UNIQUE AFTER google_id
            `);
            console.log('facebook_id added.');
        }

        // Check for apple_id
        const [appleColumns] = await connection.execute(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'apple_id'
        `, [config.database]);

        if ((appleColumns as any[]).length > 0) {
            console.log('Column apple_id already exists.');
        } else {
            console.log('Adding apple_id column...');
            await connection.execute(`
                ALTER TABLE users 
                ADD COLUMN apple_id VARCHAR(255) NULL UNIQUE AFTER facebook_id
            `);
            console.log('apple_id added.');
        }

        await connection.end();
        console.log('Migration complete.');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
