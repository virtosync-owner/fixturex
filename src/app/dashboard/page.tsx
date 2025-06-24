"use client";

import { useSession, signOut } from "next-auth/react";
import DashboardLayout from "@/app/components/DashboardLayout";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") return <p className="p-4">Loading...</p>;
    if (!session) return <p className="p-4 text-red-600">You are not logged in.</p>;

    return (
        <DashboardLayout>
            <main className="min-h-screen bg-[#f4f4f6] p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
                    <h1 className="text-3xl font-bold text-[#0073e6] mb-2">Welcome to FixtureX</h1>
                    <p className="text-gray-700 mb-6">Logged in as {session.user?.email}</p>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="bg-[#f44336] text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Sign out
                    </button>
                </div>
            </main>
        </DashboardLayout>
    );
}
