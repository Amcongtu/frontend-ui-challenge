'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchStore } from '@/stores/search'
import { useEffect, useState, useCallback } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDebounce } from '@/hooks/common/useDebounce '

export default function SearchResultPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryFromURL = searchParams.get('q') || '';
    const { query, setQuery } = useSearchStore();

    const [inputValue, setInputValue] = useState(queryFromURL || query);
    const debouncedInput = useDebounce(inputValue, 1000);

    const handleSearch = useCallback(() => {
        const trimmedQuery = inputValue.trim();
        if (trimmedQuery) {
            setQuery(trimmedQuery);
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
    }, [inputValue, router, setQuery]);

    useEffect(() => {
        const trimmedDebounced = debouncedInput.trim();
        if (trimmedDebounced && trimmedDebounced !== queryFromURL) {
            setQuery(trimmedDebounced);
            router.push(`/search?q=${encodeURIComponent(trimmedDebounced)}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Search Input */}
            <div className="relative w-full max-w-md mx-auto mb-3">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                    className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="absolute cursor-pointer right-1 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
                >
                    Search
                </button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid grid-cols-4 bg-muted w-full cursor-pointer">
                    <TabsTrigger value="posts" className='cursor-pointer'>Posts</TabsTrigger>
                    <TabsTrigger value="users" className='cursor-pointer'>Users</TabsTrigger>
                    <TabsTrigger value="events" className='cursor-pointer'>Events</TabsTrigger>
                    <TabsTrigger value="suppliers" className='cursor-pointer'>Suppliers</TabsTrigger>
                </TabsList>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-4 mt-4">
                    <Card>
                        <CardContent className="p-4 flex gap-4">
                            <Avatar className='w-12 h-12 bg-gray-400' />
                            <div className="flex-1">
                                <p className="font-semibold">Post title</p>
                                <p className="text-sm text-gray-500">Post · On-Page SEO</p>
                                <p className="text-sm text-muted-foreground">Brief excerpt of the post</p>
                            </div>
                            <Button variant="outline" className="self-start">Contact</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4 mt-4">
                    <Card>
                        <CardContent className="p-4 flex gap-4 items-center">
                            <Avatar className='w-12 h-12 bg-gray-400' />
                            <div className="flex-1">
                                <p className="font-semibold">Jon Smith</p>
                                <p className="text-sm text-gray-500">SEO Manager</p>
                            </div>
                            <Button size="sm">Follow</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex gap-4 items-center">
                            <Avatar className='w-12 h-12 bg-gray-400' />
                            <div className="flex-1">
                                <p className="font-semibold">Post title</p>
                                <p className="text-sm text-muted-foreground">Brief excerpt of espuntion</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex gap-4 items-center">
                            <Avatar className='w-12 h-12 bg-gray-400' />
                            <div className="flex-1">
                                <p className="font-semibold">Post title</p>
                                <p className="text-sm text-muted-foreground">Brief excerpt</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Events / Suppliers Tabs - placeholders */}
                <TabsContent value="events" className="mt-4">
                    <p className="text-muted-foreground">No events found.</p>
                </TabsContent>

                <TabsContent value="suppliers" className="mt-4">
                    <p className="text-muted-foreground">No suppliers found.</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}
