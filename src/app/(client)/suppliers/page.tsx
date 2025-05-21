"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const suppliers = [
    {
        id: 1,
        name: "Alpha Supplies",
        category: "Office Equipment",
        description: "Reliable office products",
    },
    {
        id: 2,
        name: "Beta Services",
        category: "Cleaning",
        description: "Top-notch cleaning solutions",
    },
    {
        id: 3,
        name: "Gamma Logistics",
        category: "Delivery",
        description: "Fast and safe delivery services",
    },
    {
        id: 4,
        name: "Delta Tech",
        category: "IT Support",
        description: "24/7 IT help desk",
    },
    {
        id: 5,
        name: "Epsilon Foods",
        category: "Catering",
        description: "Delicious food for events",
    },
    {
        id: 6,
        name: "Zeta Marketing",
        category: "Advertising",
        description: "Creative marketing campaigns",
    },
    {
        id: 7,
        name: "Eta Construction",
        category: "Building Materials",
        description: "High-quality materials",
    },
    {
        id: 8,
        name: "Theta Consulting",
        category: "Business Consulting",
        description: "Expert business advice",
    },
];

// Simple Skeleton component
function SkeletonSupplier() {
    return (
        <div className="flex items-start justify-between border rounded-md p-3 bg-white animate-pulse">
            <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded" />
                <div className="space-y-2 flex flex-col">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-32 bg-gray-300 rounded"></div>
                    <div className="h-3 w-40 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="w-20 h-8 bg-gray-300 rounded" />
        </div>
    );
}

export default function SupplierPage() {
    const [loading, setLoading] = useState(true);

    // Giả lập delay load data
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mx-auto p-4 space-y-4 overflow-scroll h-[calc(100%-70px)]">
            {/* Sponsored Label */}
            <div className="text-xs font-semibold uppercase text-gray-500">Sponsored</div>

            {/* Supplier List */}
            {loading
                ? // Hiển thị skeleton tách từng phần tử (8 lần)
                <>
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                    <SkeletonSupplier />
                </>
                : // Hiển thị data thật
                suppliers.map((supplier) => (
                    <div
                        key={supplier.id}
                        className="flex items-start justify-between border rounded-md p-3 bg-white"
                    >
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded" />
                            <div>
                                <div className="font-semibold">{supplier.name}</div>
                                <div className="text-sm text-gray-600">{supplier.category}</div>
                                <div className="text-sm text-gray-500">{supplier.description}</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            View Profile
                        </Button>
                    </div>
                ))}

            {/* CTA Buttons */}
            <div className="flex items-center justify-center fixed bottom-[47px] left-0 right-0 bg-white h-[70px] shadow-xl border">
                <Button className="w-fit hover:scale-105 transition-transform duration-200">
                    Apply to Be a Supplier
                </Button>
            </div>
            <button className="ml-4 w-12 fixed bottom-[88px] right-4 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
                <Plus className="w-5 h-5" />
            </button>
        </div>
    );
}
