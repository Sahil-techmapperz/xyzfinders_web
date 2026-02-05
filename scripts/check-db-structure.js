const mysql = require('mysql2/promise');

async function checkTableStructure() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123',
    });

    try {
        console.log('Connected to database successfully!\n');

        // Check products table structure
        console.log('=== PRODUCTS TABLE COLUMNS ===');
        const [productsColumns] = await connection.query('DESCRIBE products');
        productsColumns.forEach(col => {
            console.log(`${col.Field.padEnd(30)} | ${col.Type.padEnd(30)} | Null: ${col.Null.padEnd(5)} | Key: ${col.Key.padEnd(5)} | Default: ${col.Default || 'NULL'}`);
        });

        console.log('\n=== PRODUCT_IMAGES TABLE COLUMNS ===');
        const [imagesColumns] = await connection.query('DESCRIBE product_images');
        imagesColumns.forEach(col => {
            console.log(`${col.Field.padEnd(30)} | ${col.Type.padEnd(30)} | Null: ${col.Null.padEnd(5)} | Key: ${col.Key.padEnd(5)} | Default: ${col.Default || 'NULL'}`);
        });

        // Check if there are any existing products
        const [productCount] = await connection.query('SELECT COUNT(*) as count FROM products');
        console.log(`\n=== EXISTING DATA ===`);
        console.log(`Total products in database: ${productCount[0].count}`);

        // Get sample product to see the structure
        const [sampleProduct] = await connection.query('SELECT * FROM products LIMIT 1');
        if (sampleProduct.length > 0) {
            console.log('\n=== SAMPLE PRODUCT DATA ===');
            console.log(JSON.stringify(sampleProduct[0], null, 2));
        }

    } catch (error) {
        console.error('Error:', error.message);
        console.error(error.stack);
    } finally {
        await connection.end();
    }
}

checkTableStructure();
