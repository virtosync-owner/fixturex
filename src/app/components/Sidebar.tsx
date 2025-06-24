// src/app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, CalendarCheck, Users, Settings } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { name: "Matches", href: "/dashboard/matches", icon: <CalendarCheck size={18} /> },
    { name: "Users", href: "/dashboard/users", icon: <Users size={18} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="w-64 bg-white shadow-md min-h-screen p-4 hidden md:block">
            <div className="text-[#0073e6] font-bold text-xl mb-8">FixtureX</div>
            <nav className="flex flex-col gap-3">
                {navItems.map(({ name, href, icon }) => (
                    <Link
                        key={name}
                        href={href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${pathname.startsWith(href) ? "bg-[#e6f0ff] text-[#0073e6]" : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {icon}
                        {name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
