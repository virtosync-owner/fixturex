import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { pool } from './db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
    id: number;
    email: string;
    full_name: string;
    password_hash: string;
}

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Explicitly check and narrow credentials types
                if (!credentials?.email || typeof credentials.email !== 'string') return null;
                if (!credentials?.password || typeof credentials.password !== 'string') return null;

                const [rows] = await pool.query<UserRow[]>(
                    'SELECT * FROM users WHERE email = ?',
                    [credentials.email]
                );
                const user = rows[0];
                if (!user) return null;

                // credentials.password is now guaranteed to be string
                const isValid = await bcrypt.compare(credentials.password, user.password_hash);
                if (!isValid) return null;

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.full_name,
                };
            }
            ,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
};
