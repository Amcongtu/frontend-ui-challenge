"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import {
    AiOutlineHome,
    AiOutlineUsergroupAdd,
    AiOutlineCarryOut,
    AiOutlineFlag,
    AiOutlineBell,
} from "react-icons/ai";

const navItems = [
    { label: "Home", href: "/", icon: AiOutlineHome },
    { label: "Community", href: "/community", icon: AiOutlineUsergroupAdd },
    { label: "Suppliers", href: "/suppliers", icon: AiOutlineCarryOut },
    { label: "Event", href: "/event", icon: AiOutlineFlag },
    { label: "Notification", href: "/notification", icon: AiOutlineBell },
];

const ClientFooter = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 shadow-md z-50">
            {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={label}
                        href={href}
                        className={`flex flex-col items-center justify-center text-sm ${isActive ? "text-blue-600" : "text-gray-600"
                            }`}
                        aria-label={label}
                    >
                        <Icon className="w-6 h-6 mb-1" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default memo(ClientFooter);
