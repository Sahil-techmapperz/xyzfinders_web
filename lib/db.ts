import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            database: process.env.DB_DATABASE || 'marketplace_db',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'Techm@123',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
}

export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const results = await query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
}

export default getPool;
