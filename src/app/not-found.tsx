// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#f4f4f6] flex flex-col items-center justify-center text-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 rounded-2xl shadow-xl"
            >
                <h1 className="text-6xl font-bold text-[#0073e6] mb-4">404</h1>
                <p className="text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
                <Link
                    href="/"
                    className="bg-[#0073e6] text-white px-6 py-2 rounded-lg hover:bg-[#005bb5] transition"
                >
                    Return Home
                </Link>
            </motion.div>
        </main>
    );
}
