'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="cursor-pointer mb-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
            ← Back
        </button>
    );
}
