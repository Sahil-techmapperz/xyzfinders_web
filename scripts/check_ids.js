require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function checkIds() {
    const config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'marketplace_db',
    };

    console.log('Connecting to database...');

    let connection;
    try {
        connection = await mysql.createConnection(config);

        // Check products schema
        console.log('--- Products Schema ---');
        const [productsSchema] = await connection.execute('DESCRIBE products');
        console.table(productsSchema);

        // Check if User 1 exists
        console.log('--- User 1 ---');
        const [user1] = await connection.execute('SELECT id, name, email FROM users WHERE id = 1');
        console.table(user1);

        // Check if Seller 1 exists
        console.log('--- Seller 1 ---');
        try {
            const [seller1] = await connection.execute('SELECT id, user_id, company_name FROM sellers WHERE id = 1');
            console.table(seller1);
        } catch (e) {
            console.log('Error checking seller 1:', e.message);
        }

        // Check Product 145
        console.log('--- Product 145 ---');
        try {
            const [product145] = await connection.execute('SELECT id, user_id, title FROM products WHERE id = 145');
            console.table(product145);
        } catch (e) {
            console.log('Error checking product 145:', e.message);
        }

    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

checkIds();
