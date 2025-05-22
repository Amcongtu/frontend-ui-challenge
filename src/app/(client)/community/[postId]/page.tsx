'use client';

import { notFound, useParams } from 'next/navigation';
import { useCommunityStore } from '@/stores/communityStore';
import PostDetailClient from '@/components/pages/post/PostDetail';

export default function PostDetailPage() {
    const { postId } = useParams() as { postId: string };
    const communityData = useCommunityStore((s) => s.data);

    const tabs = Object.keys(communityData) as Array<keyof typeof communityData>;
    let post = null;

    for (const tab of tabs) {
        const found = communityData[tab].find((p) => p.id === postId);
        if (found) {
            post = {
                ...found,
                comments: Array.isArray(found.comments) ? found.comments : [],
                images: Array.isArray(found.images) ? found.images : [],
            };
            break;
        }
    }

    if (!post) return notFound();

    return <PostDetailClient post={post} />;
}
