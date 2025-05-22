import { create } from "zustand";
import { TabKey, comunityData as defaultData } from "@/data/comunicaty";

export type Post = {
    id: string;
    userName: string;
    title: string;
    text: string;
    likes: number;
    comments?: {
        id: string;
        userName: string;
        text: string;
    }[];
    images: string[];
};

type CommunityStore = {
    data: Record<TabKey, Post[]>;
    addPost: (tab: TabKey, post: Post) => void;
    removePost: (tab: TabKey, postId: string) => void;
    updatePost: (tab: TabKey, updatedPost: Post) => void;
};

export const useCommunityStore = create<CommunityStore>((set) => ({
    data: defaultData,

    addPost: (tab, post) =>
        set((state) => ({
            data: {
                ...state.data,
                [tab]: [post, ...state.data[tab]],
            },
        })),

    removePost: (tab, postId) =>
        set((state) => ({
            data: {
                ...state.data,
                [tab]: state.data[tab].filter((post) => post.id !== postId),
            },
        })),

    updatePost: (tab, updatedPost) =>
        set((state) => ({
            data: {
                ...state.data,
                [tab]: state.data[tab].map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                ),
            },
        })),
}));
