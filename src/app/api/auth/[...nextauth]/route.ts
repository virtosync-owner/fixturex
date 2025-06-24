import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/lib/db";  // your mysql2 pool
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  full_name: string;
  password_hash: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows] = await pool.query<UserRow[]>(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        const user = rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.full_name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
