
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
        const propertyId = "147";
        console.log(`Fetching property with ID: ${propertyId}`);

        const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [propertyId]);
        const property = rows[0];

        if (!property) {
            console.log("Property not found!");
            return;
        }

        console.log("Property Data:");
        console.dir(property, { depth: null });

        if (property.product_attributes) {
            console.log("\nParsed Attributes:");
            try {
                const attrs = typeof property.product_attributes === 'string'
                    ? JSON.parse(property.product_attributes)
                    : property.product_attributes;
                console.dir(attrs, { depth: null });
            } catch (e) {
                console.error("Error parsing attributes:", e);
                console.log("Raw attributes:", property.product_attributes);
            }
        } else {
            console.log("\nNo product_attributes found.");
        }

        if (property.location) {
            console.log("\nLocation Field:");
            console.log(property.location);
        } else {
            console.log("\nNo location field found (or empty).");
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
