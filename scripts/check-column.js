const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

(async () => {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const [rows] = await conn.execute('SHOW COLUMNS FROM products WHERE Field = "condition"');
    console.log(JSON.stringify(rows, null, 2));

    await conn.end();
})();
