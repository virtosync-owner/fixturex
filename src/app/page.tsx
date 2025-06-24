// src/app/page.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session, status } = useSession();
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#f4f4f6] flex flex-col items-center justify-between px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center bg-white p-8 rounded-2xl shadow-md"
      >
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="FixtureX Logo" width={80} height={80} />
        </div>

        <h1 className="text-4xl font-extrabold text-[#0073e6] mb-2">Welcome to FixtureX</h1>
        <p className="text-gray-700 mb-6">
          Manage your referees, fixtures, and leagues with a powerful, flexible platform built for the future of sport.
        </p>

        {status === "loading" ? (
          <p className="text-sm text-gray-500">Checking session...</p>
        ) : session?.user ? (
          <Link
            href="/dashboard"
            className="inline-block bg-[#0073e6] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#005bb5] transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-[#0073e6] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#005bb5] transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-white border border-[#0073e6] text-[#0073e6] font-medium px-6 py-2 rounded-lg hover:bg-[#e6f0ff] transition"
            >
              Register
            </Link>
          </div>
        )}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 text-sm text-gray-500"
      >
        &copy; {currentYear} FixtureX. All rights reserved.
      </motion.footer>
    </main>
  );
}
