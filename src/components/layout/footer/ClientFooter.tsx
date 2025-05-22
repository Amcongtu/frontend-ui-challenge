"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, ReactNode, MouseEvent, useRef } from "react";
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
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex justify-around items-center h-16 shadow-md z-50 md:mx-auto md:w-md">
            {navItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <RippleButton
                        key={label}
                        className="flex flex-col items-center justify-center text-[10px] w-full h-full text-center"
                    >
                        <Link
                            href={href}
                            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-150 ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                            aria-label={label}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            {label}
                        </Link>
                    </RippleButton>
                );
            })}
        </nav>
    );
};

const RippleButton = ({
    children,
    onClick,
    className = "",
}: {
    children: ReactNode;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
    className?: string;
}) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
        const button = containerRef.current;
        if (!button) return;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius
            }px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius
            }px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) ripple.remove();

        button.appendChild(circle);

        if (onClick) onClick(e);
    };

    return (
        <span
            ref={containerRef}
            onClick={handleClick}
            className={`relative overflow-hidden cursor-pointer select-none ${className}`}
        >
            {children}
        </span>
    );
};

export default memo(ClientFooter);
