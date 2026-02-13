
require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    try {
        const [columns] = await connection.execute('SHOW COLUMNS FROM products');
        console.log("Products Table Columns:");
        columns.forEach(col => console.log(`- ${col.Field} (${col.Type})`));

        console.log("\nLocations Table Columns:");
        const [locColumns] = await connection.execute('SHOW COLUMNS FROM locations');
        locColumns.forEach(col => console.log(`- ${col.Field} (${col.Type})`));

        // Check product 147 again
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = 147');
        if (rows.length > 0) {
            console.log("\nProduct 147 Data (Keys):");
            Object.keys(rows[0]).forEach(key => {
                const val = rows[0][key];
                if (val !== null && val !== undefined && key.includes('id')) {
                    console.log(`${key}: ${val}`);
                }
            });
            console.log(`location column value:`, rows[0]['location']);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
