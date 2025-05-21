'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";

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
            <div className="sticky top-0 z-50 bg-white border-b">
                <TabsList className="grid grid-cols-4 w-full">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-2">
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div
                                key={index}
                                className="border rounded-md p-3 mb-3 space-y-2 bg-white"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                                    <div className="text-sm font-semibold">User Name</div>
                                </div>
                                <div className="text-base font-medium">
                                    [{tab.label}] Post Title #{index + 1}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </div>
                                <div className="flex space-x-4 text-sm text-gray-500">
                                    <span>❤️ {Math.floor(Math.random() * 20)}</span>
                                    <span>💬 {Math.floor(Math.random() * 10)}</span>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </div>

            {/* Floating button */}
            <div className="fixed bottom-[88px] right-4 z-50">
                <button
                    onClick={handleClick}
                    className={`w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${clicked ? "animate-pop" : ""
                        }`}
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>
        </Tabs>
    );
}
