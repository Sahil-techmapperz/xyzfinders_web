require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function checkSchema() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    try {
        console.log('\n--- Users Table Columns ---');
        const [usersColumns] = await connection.query('DESCRIBE users');
        console.log(usersColumns.map(c => c.Field).join(', '));

        console.log('\n--- Buyers Table Columns ---');
        try {
            const [buyersColumns] = await connection.query('DESCRIBE buyers');
            console.log(buyersColumns.map(c => c.Field).join(', '));
        } catch (e) {
            console.log('Buyers table not found / error');
        }

        console.log('\n--- Sellers Table Columns ---');
        try {
            const [sellersColumns] = await connection.query('DESCRIBE sellers');
            console.log(sellersColumns.map(c => c.Field).join(', '));
        } catch (e) {
            console.log('Sellers table not found / error');
        }

    } catch (error) {
        console.error('Error checking schema:', error);
    } finally {
        await connection.end();
    }
}

checkSchema();
