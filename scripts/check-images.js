const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

(async () => {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    const [products] = await conn.execute(`
        SELECT p.id, p.title, COUNT(pi.id) as image_count 
        FROM products p 
        LEFT JOIN product_images pi ON p.id = pi.product_id 
        GROUP BY p.id 
        ORDER BY p.id
    `);

    console.log('\n📋 Products and their image counts:\n');

    products.forEach(p => {
        const status = p.image_count > 0 ? '✓' : '✗';
        console.log(`${status} ID ${String(p.id).padStart(2)}: ${p.title.substring(0, 40).padEnd(40)} | ${p.image_count} image(s)`);
    });

    const noImages = products.filter(p => p.image_count === 0);
    console.log(`\n⚠️  Products without images: ${noImages.length}`);

    await conn.end();
})();
