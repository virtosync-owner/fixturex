"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });

    return (
        <main className="min-h-screen bg-[#f4f4f6] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-[#0073e6] mb-6">Log in to FixtureX</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        signIn("credentials", {
                            email: form.email,
                            password: form.password,
                            callbackUrl: "/dashboard",
                        });
                    }}
                    className="space-y-4"
                >
                    <input
                        className="w-full border border-[#e0e0e2] px-4 py-2 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-[#0073e6]"
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
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#0073e6] font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </main>
    );
}
