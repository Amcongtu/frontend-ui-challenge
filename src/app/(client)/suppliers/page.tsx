"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { suppliers } from "@/data/suppliers";
import Link from "next/link";
import Image from "next/image";

export default function SupplierListPage() {
    return (
        <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white  md:mx-auto md:w-md">
            {/* Header */}
            <div className="p-4 text-xs font-semibold">
                <Button variant="outline" size="sm" className="rounded-full text-xs">
                    SPONSORED
                </Button>
            </div>

            {/* Supplier List */}
            <div className="space-y-4 px-4 pb-3 h-[calc(100vh-258px)] overflow-auto">
                {suppliers.map((supplier) => (
                    <div
                        key={supplier.id}
                        className="flex items-start gap-4 border-b pb-4"
                    >
                        {/* Image Placeholder */}
                        <Image
                            src={supplier.image}
                            alt={`${supplier.name} avatar`}
                            width={96}
                            height={96}
                            className="rounded-md object-cover mb-4"
                        />

                        {/* Text Content */}
                        <div className="flex-1">
                            <div className="font-semibold text-sm">{supplier.name}</div>
                            <div className="text-xs text-gray-500">{supplier.category}</div>
                            <div className="text-xs text-gray-500 line-clamp-3 mt-2">{supplier.description}</div>
                        </div>

                        {/* View Profile Button */}
                        <Link href={`/suppliers/${supplier.id}`}>
                            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                                View Profile
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Apply Button */}
            <div className="flex items-center justify-center fixed bottom-[60px] left-0 right-0 bg-white dark:bg-gray-900 h-[70px] shadow-xl border-t dark:border-gray-700  md:mx-auto md:w-md">
                <Button className="w-fit text-sm hover:scale-105 transition-transform duration-200">
                    Apply to Be a Supplier
                </Button>
            </div>

            {/* Floating Action Button */}
            <button className="sticky left-[365px] bottom-[80px] w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl">
                <Plus className="w-5 h-5" />
            </button>
        </div>
    );
}
