import { notFound } from 'next/navigation';
import Image from 'next/image';
import { comunityData, TabKey } from '@/data/comunicaty';

type Props = {
    params: {
        postId: string;
    };
};
export async function getPostById(postId: string) {
    const tabs: TabKey[] = ["on-page", "off-page", "technical", "general"];

    for (const tab of tabs) {
        const post = comunityData[tab].find((p) => p.id === postId);
        if (post) {
            return {
                ...post,
                comments: Array.isArray(post.comments)
                    ? post.comments.map((c, index) => ({
                        id: `${postId}-c${index}`,
                        userName: "User",
                        text: "Sample comment",
                    }))
                    : [],
                imageUrl: post.images?.[0] || "",
            };
        }
    }

    return null;
}
export default async function PostDetailPage({ params }: Props) {
    const { postId } = params;
    const post = await getPostById(postId);

    if (!post) return notFound();

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 overflow-auto h-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {post.title}
            </h1>

            {post.imageUrl && (
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-auto max-h-96 rounded mb-4 object-cover"
                />
            )}

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
            </div>

            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Comments
            </h2>

            <div className="space-y-3">
                {post.comments.map((c: typeof post.comments[0]) => (
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
