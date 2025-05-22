"use client"

import { comunityData } from "@/data/comunicaty";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostDetailClient = ({ post }: { post: typeof comunityData["on-page"][0] }) => {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 overflow-auto h-full">
            <button
                onClick={() => router.back()}
                className="mb-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {post.title}
            </h1>

            {post.images?.length > 0 && (
                <Image
                    src={post.images[0]}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-auto max-h-96 rounded mb-4 object-cover"
                />
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <span>❤️ {post.likes}</span>
                <span>💬 {post?.comments?.length}</span>
            </div>

            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Comments
            </h2>

            <div className="space-y-3">
                {post?.comments?.map((c: typeof post.comments[0]) => (
                    <div
                        key={c.id}
                        className="border dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded shadow-sm"
                    >
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {c.userName}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostDetailClient