const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
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
        console.log('Reading sellers.sql...');
        const sqlPath = path.join(__dirname, '..', 'sellers.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing SQL to create sellers table...');
        await pool.query(sql);
        console.log('Table created successfully.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
        console.log('Done.');
    }
}

main();
