const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

(async () => {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const [rows] = await conn.execute(`
        SELECT id, title, category_id, product_attributes 
        FROM products 
        ORDER BY id
    `);

    console.log('\n📋 Products and their attributes:\n');

    let missingCount = 0;
    rows.forEach(r => {
        const hasAttrs = r.product_attributes ? '✓' : '✗';
        if (!r.product_attributes) missingCount++;

        let attrsPreview = 'NULL';
        if (r.product_attributes) {
            const attrs = typeof r.product_attributes === 'string'
                ? JSON.parse(r.product_attributes)
                : r.product_attributes;
            attrsPreview = JSON.stringify(attrs).substring(0, 50) + '...';
        }
        console.log(`${hasAttrs} ID ${String(r.id).padStart(2)}: ${r.title.substring(0, 35).padEnd(35)} | ${attrsPreview}`);
    });

    console.log(`\n⚠️  Products without attributes: ${missingCount}`);

    await conn.end();
})();
