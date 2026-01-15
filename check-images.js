const mysql = require('mysql2/promise');

async function checkImages() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Techm@123',
        database: 'marketplace_db'
    });

    try {
        // Check if product 461 exists
        const [products] = await connection.execute(
            'SELECT id, user_id, title, status FROM products WHERE id = 461'
        );
        console.log('Product 461:', products);

        // Check image data for products 460 and 461
        const [images] = await connection.execute(
            'SELECT product_id, id, LENGTH(image_data) as image_size, is_primary FROM product_images WHERE product_id IN (460, 461) ORDER BY product_id'
        );
        console.log('\nProduct Images:', images);

        // Check a few more products to see the pattern
        const [moreImages] = await connection.execute(
            'SELECT product_id, COUNT(*) as image_count, SUM(LENGTH(image_data)) as total_size FROM product_images WHERE product_id BETWEEN 460 AND 465 GROUP BY product_id'
        );
        console.log('\nImage counts for products 460-465:', moreImages);

    } finally {
        await connection.end();
    }
}

checkImages().catch(console.error);
