// src/app/components/DashboardLayout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 bg-[#f4f4f6] p-6 overflow-auto">
                {children}
            </main>
        </div>
    );
}
