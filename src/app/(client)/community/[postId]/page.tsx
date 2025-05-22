import { notFound } from 'next/navigation';
import { comunityData, TabKey } from '@/data/comunicaty';
import PostDetailClient from '@/components/pages/post/PostDetail';

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
                        id: `${postId} -c${index} `,
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
    const post = await getPostById(params.postId);

    if (!post) return notFound();

    return <PostDetailClient post={post} />;
}

