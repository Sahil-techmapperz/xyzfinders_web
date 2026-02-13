
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
        const productId = 147;
        const [rows] = await connection.execute(
            `SELECT p.*, 
        u.name as seller_name, u.phone as seller_phone, u.created_at as seller_created_at, u.is_verified as seller_is_verified,
        c.name as category_name,
        l.name as location_name,
        l.postal_code as postal_code,
        ci.name as city_name,
        s.name as state_name,
        COALESCE(sl.avatar, b.avatar) as seller_avatar
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN locations l ON p.location_id = l.id
      LEFT JOIN cities ci ON l.city_id = ci.id
      LEFT JOIN states s ON ci.state_id = s.id
      LEFT JOIN sellers sl ON u.id = sl.user_id
      LEFT JOIN buyers b ON u.id = b.user_id
      WHERE p.id = ?`,
            [productId]
        );

        if (rows.length > 0) {
            console.log("API Query Result (Partial):");
            const p = rows[0];
            console.log(`id: ${p.id}`);
            console.log(`location_id: ${p.location_id}`);
            console.log(`location_name: ${p.location_name}`);
            console.log(`city_name: ${p.city_name}`);
        } else {
            console.log("Product not found");
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

main();
