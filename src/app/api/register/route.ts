import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function POST(req: Request) {
    try {
        const { email, fullName, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const [existingRows] = await pool.query<RowDataPacket[]>(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingRows.length > 0) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);

        const [insertResult] = await pool.query<ResultSetHeader>(
            'INSERT INTO users (email, full_name, password_hash) VALUES (?, ?, ?)',
            [email, fullName || null, hashed]
        );

        return NextResponse.json({
            success: true,
            userId: insertResult.insertId,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
