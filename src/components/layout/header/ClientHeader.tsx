"use client";

import { getRouteMeta } from "@/routesConfig";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const ClientHeader = () => {
    const pathname = usePathname();
    const routeMeta = getRouteMeta(pathname);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        router.push("/login");
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <header className="flex items-center justify-between p-4 border-b md:mx-auto md:w-md">
            <div className="flex items-center gap-3 text-gray-700">
                {/* Avatar Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button>
                            <HiUserCircle className="w-8 h-8 rounded-full cursor-pointer dark:text-white" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="start" className="w-48">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => console.log("Go to Settings")}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            LogOut
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Toggle Theme Button */}
                <button
                    onClick={toggleTheme}
                    className="text-xl text-gray-700 dark:text-white transition-colors cursor-pointer"
                >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>
            </div>

            <h1 className="text-xl font-semibold flex justify-end">
                {routeMeta ? routeMeta.name : "Unknown"}
            </h1>
        </header>
    );
};

export default memo(ClientHeader);
