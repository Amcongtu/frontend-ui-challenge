'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'

export default function SearchResultPage() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Search Input */}
            <Input placeholder="Search..." defaultValue="link building" className="mb-4" />

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid grid-cols-4 bg-muted">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                </TabsList>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-4 mt-4">
                    <Card>
                        <CardContent className="p-4 flex gap-4">
                            <Avatar />
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
                            <Avatar />
                            <div className="flex-1">
                                <p className="font-semibold">Jon Smith</p>
                                <p className="text-sm text-gray-500">SEO Manager</p>
                            </div>
                            <Button size="sm">Follow</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex gap-4 items-center">
                            <Avatar />
                            <div className="flex-1">
                                <p className="font-semibold">Post title</p>
                                <p className="text-sm text-muted-foreground">Brief excerpt of espuntion</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex gap-4 items-center">
                            <Avatar />
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
