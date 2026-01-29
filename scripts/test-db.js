const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '.env.local' });
dotenv.config(); // Also check .env

async function testConnection() {
    console.log('Testing MySQL Connection...');

    const config = {
        host: process.env.DB_HOST || '127.0.0.1', // Default to localhost if missing
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT || 3306
    };

    console.log(`Target: ${config.user}@${config.host}:${config.port}/${config.database}`);

    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ Connection Successful!');

        const [rows] = await connection.execute('SELECT 1 as val');
        console.log('Query Result:', rows);

        await connection.end();
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Tip: Check if MySQL is running and listening on the specified host/port.');
            console.error('If on the same server, try using "127.0.0.1" as DB_HOST.');
        }
    }
}

testConnection();
