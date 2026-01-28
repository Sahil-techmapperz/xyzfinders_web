const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function createBuyersTable() {
    console.log('Connecting to database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        database: process.env.DB_DATABASE || 'marketplace_db',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'Techm@123'
    });

    try {
        console.log('Creating buyers table...');
        const createQuery = `
            CREATE TABLE IF NOT EXISTS buyers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(255),
                email VARCHAR(255),
                avatar VARCHAR(500),
                social_data JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_user (user_id)
            );
        `;
        await connection.execute(createQuery);
        console.log('Buyers table created successfully (or already exists).');

        console.log('Migrating existing users to buyers table...');
        // Select users who are buyers (or just all users to ensure coverage)
        const [users] = await connection.execute('SELECT * FROM users');

        for (const user of users) {
            // Check if user already exists in buyers
            const [existing] = await connection.execute('SELECT id FROM buyers WHERE user_id = ?', [user.id]);

            if (existing.length === 0) {
                // Determine source of data (mostly Google/FB) - for now just copy users table data 
                // as a baseline.
                await connection.execute(
                    `INSERT INTO buyers (user_id, name, email, avatar, created_at, updated_at) 
                     VALUES (?, ?, ?, ?, NOW(), NOW())`,
                    [user.id, user.name, user.email, user.avatar]
                );
                console.log(`Migrated user ${user.id} (${user.email}) to buyers.`);
            }
        }
        console.log('Migration complete.');

    } catch (error) {
        console.error('Error creating buyers table:', error);
    } finally {
        await connection.end();
    }
}

createBuyersTable();
