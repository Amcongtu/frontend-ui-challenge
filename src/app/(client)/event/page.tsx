"use client";

import { useState } from "react";
import { Calendar, MapPin, Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const filters = [
    "All Events",
    "Upcoming This Month",
    "By Region",
    "By Type",
    "Sponsored",
];

const events = [
    {
        id: 1,
        title: "Search Optimization Summit",
        date: "June 27 10:00 AM GMT",
        location: "London",
        tags: ["SEO", "Link Building"],
    },
    {
        id: 2,
        title: "Digital Marketing Conference",
        date: "July 14 9:00 AM",
        location: "New York",
        tags: ["SEO", "Link Building"],
    },
    {
        id: 3,
        title: "SEO Webinar Series",
        date: "August 5 2:00 CDT",
        location: "Online",
        tags: ["SEO"],
    },
];

export default function EventsPage() {
    const [activeFilter, setActiveFilter] = useState("All Events");

    return (
        <div className="relative overflow-y-scroll h-full bg-white dark:bg-gray-900 text-black dark:text-white">
            {/* Header */}
            <div className="p-4 text-2xl font-semibold">Events</div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 px-4 pb-4">
                {filters.map((filter) => (
                    <Button
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className="rounded-full text-xs"
                    >
                        {filter}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 dark:text-gray-400"
                    onClick={() => setActiveFilter("All Events")}
                >
                    Clear
                </Button>
            </div>

            {/* Event Cards */}
            <div className="space-y-4 px-4 pb-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 relative border border-gray-100 dark:border-gray-700"
                    >
                        <Bookmark className="absolute top-4 right-4 w-4 h-4 text-gray-400 dark:text-gray-300" />

                        {/* Placeholder for image */}
                        <div className="bg-gray-200 dark:bg-gray-700 h-28 mb-3 rounded-md" />

                        <h3 className="font-semibold text-sm mb-1">{event.title}</h3>

                        <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {event.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-[90px] right-4 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl">
                <Plus className="w-5 h-5" />
            </button>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
                {["Home", "Community", "Suppliers", "Events", "Notifications"].map((tab) => (
                    <div
                        key={tab}
                        className={`text-xs ${tab === "Events"
                                ? "text-black dark:text-white font-semibold"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                    >
                        {tab}
                    </div>
                ))}
            </nav>
        </div>
    );
}
