const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function updateSellersTable() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123'
    });

    try {
        console.log('Checking columns in sellers table...');
        const [columns] = await connection.execute('SHOW COLUMNS FROM sellers');
        const columnNames = columns.map(col => col.Field);

        const columnsToAdd = [];

        if (!columnNames.includes('phone')) {
            columnsToAdd.push('ADD COLUMN phone VARCHAR(20) NOT NULL');
        }
        if (!columnNames.includes('gst_number')) {
            columnsToAdd.push('ADD COLUMN gst_number VARCHAR(50)');
        }
        if (!columnNames.includes('documents')) {
            columnsToAdd.push('ADD COLUMN documents JSON'); // Or TEXT if JSON not supported
        }
        if (!columnNames.includes('social_links')) {
            columnsToAdd.push('ADD COLUMN social_links JSON');
        }
        if (!columnNames.includes('is_verified')) {
            columnsToAdd.push('ADD COLUMN is_verified BOOLEAN DEFAULT FALSE');
        }

        if (columnsToAdd.length > 0) {
            const alterQuery = `ALTER TABLE sellers ${columnsToAdd.join(', ')}`;
            console.log('Executing:', alterQuery);
            await connection.execute(alterQuery);
            console.log('Sellers table updated successfully.');
        } else {
            console.log('Sellers table already has all required columns.');
        }

    } catch (error) {
        console.error('Error updating sellers table:', error);
    } finally {
        await connection.end();
    }
}

updateSellersTable();
