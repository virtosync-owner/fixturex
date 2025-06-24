import { pool } from './db';

export async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}
