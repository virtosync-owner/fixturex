"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="FixtureX Logo" width={32} height={32} />
                <span className="text-[#0073e6] text-xl font-bold">FixtureX</span>
            </Link>

            <nav className="flex items-center gap-4">
                {session ? (
                    <>
                        <Link href="/dashboard" className="text-[#0073e6] font-medium hover:underline">
                            Dashboard
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="bg-[#f44336] text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-[#0073e6] font-medium hover:underline">
                            Log In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-[#0073e6] text-white px-4 py-1.5 rounded-lg hover:bg-[#005bb5] transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
