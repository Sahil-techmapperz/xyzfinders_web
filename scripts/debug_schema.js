const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function checkSchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME, // Fix from DB_USER
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE // Fix from DB_NAME
    });

    try {
        console.log('Connected.');

        console.log('--- SELLERS Columns ---');
        const [sellerCols] = await connection.execute('SHOW COLUMNS FROM sellers');
        sellerCols.forEach(col => console.log(col.Field));

        console.log('--- BUYERS Columns ---');
        const [buyerCols] = await connection.execute('SHOW COLUMNS FROM buyers');
        buyerCols.forEach(col => console.log(col.Field));

    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
}

checkSchema();
