
require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    try {
        console.log("\n--- PRODUCTS TABLE ---");
        const [productsDesc] = await connection.execute('DESCRIBE products');
        console.table(productsDesc);

        // Just show description

        console.log("\n--- PRODUCTS DATA (Partial) ---");
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = 147');
        // Console log keys to see columns
        if (rows.length > 0) {
            console.log("Columns:", Object.keys(rows[0]));
            console.log("Data:", rows[0]);
        }

        console.log("\n--- LOCATIONS TABLE ---");
        try {
            const [locationsDesc] = await connection.execute('DESCRIBE locations');
            console.table(locationsDesc);
        } catch (e) {
            console.log("locations table might not exist or error:", e.message);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
