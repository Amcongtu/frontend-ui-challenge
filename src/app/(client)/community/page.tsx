'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TabKey } from "@/data/comunicaty";
import Link from "next/link";
import Image from "next/image";
import { useCommunityStore } from "@/stores/communityStore";
import { useRouter } from "next/navigation";

const tabs = [
    { label: "On-Page", value: "on-page" },
    { label: "Off-Page", value: "off-page" },
    { label: "Technical", value: "technical" },
    { label: "General", value: "general" },
];


export default function CommunityTabPage() {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const comunityData = useCommunityStore((state) => state.data);
    const handleClick = () => {
        setClicked(true);
        setClicked(false);
        router.push("/community/create");
    };
    return (
        <>
            <Tabs defaultValue="on-page" className="relative h-full flex flex-col">
                {/* Sticky Tab bar */}
                <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                    <TabsList className="grid grid-cols-4 w-full bg-white dark:bg-gray-900">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer"
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
                                {comunityData[tab.value as TabKey]?.length > 0 ? (
                                    comunityData[tab.value as TabKey].map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/community/${post.id}`}
                                            className="block border dark:border-gray-700 rounded-md p-3 mb-3 space-y-2 bg-white dark:bg-gray-900 no-underline cursor-pointer"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700" />
                                                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                    {post.userName}
                                                </div>
                                            </div>

                                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                                [{tab.label}] {post.title}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{post.text}</div>
                                            {post.images.length > 0 && (
                                                <Image
                                                    src={post.images[0]}
                                                    alt={post.title}
                                                    width={600}
                                                    height={288}
                                                    className="rounded-md object-cover"
                                                />
                                            )}
                                            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>❤️ {post.likes}</span>
                                                <span>💬 {post.comments?.length || 0}</span>
                                            </div>
                                        </Link>

                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                                        No posts available.
                                    </div>
                                )}
                            </motion.div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
            {/* Floating button */}
            <div className="sticky flex justify-end mr-[40px] bottom-[28px] z-50">
                <Link
                    href={"/community/create"}
                    onClick={handleClick}
                    className={`w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105 ${clicked ? "animate-pop" : ""}`}
                >
                    <Plus className="w-6 h-6" />
                </Link>
            </div>
        </>
    );
}
