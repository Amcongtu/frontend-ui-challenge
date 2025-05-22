"use client";

import { useState } from "react";
import { Calendar, MapPin, Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, EventType } from "@/data/events";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
const filters = [
    {
        label: "All Events",
        value: "all-events",
    },
    {
        label: "Upcoming This Month",
        value: EventType.UPCOMING_THIS_MONTH,
    },
    {
        label: "By Region",
        value: EventType.BY_REGION,
    },
    {
        label: "By Type",
        value: EventType.BY_TYPE,
    },
    {
        label: "Sponsored",
        value: EventType.SPONSORED,
    },
]

export default function EventsPage() {
    const [activeFilter, setActiveFilter] = useState(filters[0].value);

    return (
        <>
            <div className="relative overflow-y-scroll h-full bg-white dark:bg-gray-900 text-black dark:text-white">
                {/* Header */}
                <div className="p-4 text-2xl font-semibold">Events</div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                    {filters.map((filter) => (
                        <Button
                            key={filter.value}
                            variant={activeFilter === filter.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveFilter(filter.value)}
                            className="rounded-full text-xs"
                        >
                            {filter.label}
                        </Button>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-500 dark:text-gray-400"
                        onClick={() => setActiveFilter("all-events")}
                    >
                        Clear
                    </Button>
                </div>

                {/* Event Cards */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 px-4 pb-3"
                    >
                        {events
                            .filter(event =>
                                activeFilter === "all-events" ? true : event.type === activeFilter
                            )
                            .map((event) => (
                                <Link
                                    href={`/event/${event.id}`}
                                    key={event.id}
                                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 relative border border-gray-100 dark:border-gray-700"
                                >
                                    <Bookmark className="absolute top-5 right-5 w-4 h-4 text-gray-400 dark:text-gray-300" />
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        width={400}
                                        height={112}
                                        className="w-full h-auto max-h-48 rounded mb-3 object-cover"
                                    />
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
                                </Link>
                            ))}
                    </motion.div>
                </AnimatePresence>


            </div>
            {/* Floating Action Button */}
            <div className="sticky flex justify-end mr-[40px] bottom-[28px] z-50">
                <button className=" w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </>
    );
}
