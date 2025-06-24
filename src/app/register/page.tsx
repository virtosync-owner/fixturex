"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({ email: "", fullName: "", password: "" });
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) router.push("/login");
        else alert("Registration failed");
    }

    return (
        <main className="min-h-screen bg-[#f4f4f6] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-[#0073e6] mb-6">Register for FixtureX</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        className="w-full text-black border border-[#e0e0e2] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073e6]"
                        type="text"
                        placeholder="Full Name"
                        required
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    <input
                        className="w-full text-black border border-[#e0e0e2] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073e6]"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="w-full text-black border border-[#e0e0e2] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073e6]"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#0073e6] text-white py-2 rounded-lg hover:bg-[#005bb5] transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#0073e6] font-medium hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </main>
    );
}
