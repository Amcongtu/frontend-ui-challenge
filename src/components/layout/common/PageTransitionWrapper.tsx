'use client'

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            null
        );
    }

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ position: "absolute", width: "100%" }}
            >
                <main className="flex-grow overflow-y-auto h-[calc(100vh-128px)]">
                    {children}
                </main>
            </motion.div>
        </AnimatePresence>
    );
}
