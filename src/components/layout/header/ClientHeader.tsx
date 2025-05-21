"use client";
import { getRouteMeta } from "@/routesConfig";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { HiUserCircle } from "react-icons/hi";

const ClientHeader = () => {
    const pathname = usePathname();
    const routeMeta = getRouteMeta(pathname);

    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2 text-gray-700">
                <HiUserCircle className="w-8 h-8 rounded-full" />
            </div>
            <h1 className="text-xl font-semibold flex justify-end">
                {routeMeta ? routeMeta.name : "Unknown"}
            </h1>
        </header>
    );
};

export default memo(ClientHeader);
