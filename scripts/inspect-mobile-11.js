
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
        console.log("Fetching data for Product ID 11...");
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = 11');

        if (rows.length > 0) {
            const product = rows[0];
            console.log("\n--- Product Basic Info ---");
            console.log("ID:", product.id);
            console.log("Title:", product.title);
            console.log("Category ID:", product.category_id);

            console.log("\n--- Product Attributes (Raw) ---");
            console.log(product.product_attributes);

            console.log("\n--- Product Attributes (Parsed) ---");
            try {
                const attrs = typeof product.product_attributes === 'string'
                    ? JSON.parse(product.product_attributes)
                    : product.product_attributes;
                console.dir(attrs, { depth: null });
            } catch (e) {
                console.error("Error parsing JSON:", e.message);
            }
        } else {
            console.log("Product 11 not found.");
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
