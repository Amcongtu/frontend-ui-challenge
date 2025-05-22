'use client';

import { useRouter } from "next/navigation";
import { useCommunityStore } from "@/stores/communityStore";
import { useUserStore } from "@/stores/userStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TabKey } from "@/data/comunicaty";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
    title: z.string().min(3, "Title is required"),
    text: z.string().min(10, "Content is too short"),
    tab: z.enum(["on-page", "off-page", "technical", "general"]),
});

type FormData = z.infer<typeof schema>;

export default function CreatePostPage() {
    const router = useRouter();
    const addPost = useCommunityStore((s) => s.addPost);
    const user = useUserStore((s) => s.user);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            text: "",
            tab: "general",
        },
    });

    const onSubmit = (data: FormData) => {
        addPost(data.tab, {
            id: crypto.randomUUID(),
            userName: String(user?.id ?? "guest"),
            title: data.title,
            text: data.text,
            likes: 0,
            comments: [],
            images: imagePreview ? [imagePreview] : [],
        });
        router.push("/community");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto h-full overflow-auto px-4 py-6 space-y-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => router.back()}>
                    Cancel
                </Button>
                <h2 className="font-semibold text-lg">Create New Post</h2>
                <Button type="submit">Post</Button>
            </div>

            {/* Title */}
            <Input
                placeholder="Title"
                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                {...register("title")}
            />
            {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
            )}

            {/* Textarea */}
            <Textarea
                placeholder="Write your post..."
                className="min-h-[120px] bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                {...register("text")}
            />
            {errors.text && (
                <p className="text-sm text-red-500">{errors.text.message}</p>
            )}

            {/* Image Upload */}
            <label className="block">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-300 text-xl cursor-pointer">
                    📷
                </div>
            </label>
            {imagePreview && (
                <div className="w-full">
                    <Image
                        src={imagePreview}
                        alt="preview"
                        width={600}
                        height={300}
                        className="rounded-md mt-2 object-cover"
                    />
                </div>
            )}

            {/* Tab select */}
            <select
                {...register("tab")}
                className="w-full border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
                <option value="on-page">On-Page</option>
                <option value="off-page">Off-Page</option>
                <option value="technical">Technical</option>
                <option value="general">General</option>
            </select>
        </form>
    );
}
