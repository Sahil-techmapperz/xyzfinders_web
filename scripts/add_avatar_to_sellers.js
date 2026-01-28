const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        console.log('Connected to database.');

        // Add avatar column to sellers table
        console.log('Adding avatar column to sellers table...');
        try {
            await connection.execute(`
                ALTER TABLE sellers 
                ADD COLUMN avatar TEXT AFTER user_id
            `);
            console.log('Added avatar column to sellers.');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log('Column avatar already exists in sellers.');
            } else {
                throw e;
            }
        }

        console.log('Migration complete.');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await connection.end();
    }
}

migrate();
