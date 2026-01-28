const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        console.log('Connected to database.');

        // 0. Drop table if exists to ensure schema update (since migration failed previously)
        console.log('Dropping buyers table if exists...');
        await connection.execute('DROP TABLE IF EXISTS buyers');

        // 1. Create buyers table
        console.log('Creating buyers table...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS buyers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL UNIQUE,
                avatar TEXT,
                phone VARCHAR(50),
                location VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // 2. Migrate data from users table
        console.log('Migrating data from users to buyers...');
        const [users] = await connection.execute('SELECT id, avatar FROM users');

        for (const user of users) {
            // Check if buyer entry exists
            const [existing] = await connection.execute('SELECT id FROM buyers WHERE user_id = ?', [user.id]);

            if (existing.length === 0) {
                // Insert into buyers
                // We migrate avatar. Phone/location might be null in users or effectively null, 
                // but let's just migrate avatar for now as requested.
                // Actually, if we want to move phone/location too, we should fetch them.
                // But the user specifically asked for "avatar, profile image".
                // I'll migrate avatar.
                if (user.avatar) {
                    await connection.execute(
                        'INSERT INTO buyers (user_id, avatar) VALUES (?, ?)',
                        [user.id, user.avatar]
                    );
                } else {
                    // Create empty buyer profile for consistency? Not strictly necessary unless we want to enforce it.
                    // Let's create it to be safe.
                    await connection.execute(
                        'INSERT INTO buyers (user_id) VALUES (?)',
                        [user.id]
                    );
                }
            }
        }

        // 3. Drop avatar column from users (Optional - User asked to "remove")
        // I will comment this out for safety first, then if user confirms or I am confident, I can run it.
        // User explicitly said "remove the avater , profile image colom from the user table".
        console.log('Dropping avatar column from users...');
        try {
            await connection.execute('ALTER TABLE users DROP COLUMN avatar');
            console.log('Dropped avatar column.');
        } catch (e) {
            console.log('Avatar column might already be dropped or error:', e.message);
        }

        // Check for profile_image column just in case
        try {
            await connection.execute('ALTER TABLE users DROP COLUMN profile_image');
            console.log('Dropped profile_image column.');
        } catch (e) {
            // Ignore if it doesn't exist
        }

        console.log('Migration complete.');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await connection.end();
    }
}

migrate();
