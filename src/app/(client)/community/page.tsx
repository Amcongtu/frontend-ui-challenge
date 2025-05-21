'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = [
    { label: "On-Page", value: "on-page" },
    { label: "Off-Page", value: "off-page" },
    { label: "Technical", value: "technical" },
    { label: "General", value: "general" },
];

export default function CommunityTabPage() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
    };

    return (
        <Tabs defaultValue="on-page" className="relative h-full flex flex-col">
            {/* Sticky Tab bar */}
            <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                <TabsList className="grid grid-cols-4 w-full bg-white dark:bg-gray-900">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50 dark:bg-black">
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {Array.from({ length: 20 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="border dark:border-gray-700 rounded-md p-3 mb-3 space-y-2 bg-white dark:bg-gray-900"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            User Name
                                        </div>
                                    </div>
                                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                        [{tab.label}] Post Title #{index + 1}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </div>
                                    <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span>❤️ {Math.floor(Math.random() * 20)}</span>
                                        <span>💬 {Math.floor(Math.random() * 10)}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </TabsContent>
                ))}
            </div>

            {/* Floating button */}
            <div className="fixed bottom-[88px] right-4 z-50">
                <button
                    onClick={handleClick}
                    className={`w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105 ${clicked ? "animate-pop" : ""
                        }`}
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>
        </Tabs>
    );
}
