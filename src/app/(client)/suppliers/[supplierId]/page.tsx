"use client";

import React, { use } from "react";
import { BackButton } from "@/components/layout/common/BackButton";
import useGetSupplierDetail from "@/hooks/suppliers/useGetSupplierDetail";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Props = {
    params: Promise<{
        supplierId: string;
    }>;
};

export default function SupplierDetailPage(props: Props) {
    const params = use(props.params); // unwrap params promise
    const data = useGetSupplierDetail(params.supplierId);

    if (!data) return notFound();

    const { name, category, description, rating, image, website, requestInfoEmail } = data;

    const maxStars = 5;

    return (
        <div className="min-h-screen bg-black text-white px-4 pt-6 pb-24">
            <BackButton />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold">{name}</h1>
                <button className="text-white text-2xl">⋮</button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center">
                <Image
                    src={image}
                    alt={`${name} avatar`}
                    width={96}
                    height={96}
                    className="rounded-full object-cover mb-4"
                />

                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-sm text-gray-400 mt-1">{category}</p>

                {/* Stars */}
                <div className="flex mt-2">
                    {[...Array(maxStars)].map((_, i) =>
                        i < rating ? (
                            <AiFillStar key={i} className="text-yellow-400" />
                        ) : (
                            <AiOutlineStar key={i} className="text-gray-600" />
                        )
                    )}
                </div>

                {/* Description */}
                <p className="text-center text-sm text-gray-300 mt-4 px-4 whitespace-pre-line">
                    {description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700"
                    >
                        Visit Website
                    </a>
                    <a
                        href={`mailto:${requestInfoEmail}`}
                        className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700"
                    >
                        Request Info
                    </a>
                </div>
            </div>

            {/* Additional Content Placeholder */}
            <div className="mt-10 bg-zinc-800 h-4 rounded-full w-2/3 mx-auto opacity-40" />
        </div>
    );
}
