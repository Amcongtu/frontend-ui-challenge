'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-md mx-auto p-4 space-y-6 h-full overflow-auto">
            {/* Avatar + Header */}
            <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 bg-gray-300 rounded-full" />
                <div className="text-center">
                    <h2 className="text-lg font-semibold">Jane Doe</h2>
                    <p className="text-sm text-muted-foreground">janedoe@example.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        SEO specialist and content marketer
                    </p>
                </div>
                <Button variant="outline" size="sm">Contact</Button>
            </div>

            {/* Stats */}
            <div className="flex justify-around text-center text-sm">
                <Stat label="Followers" value="120" />
                <Stat label="Following" value="50" />
                <Stat label="Posts" value="8" />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="followers">Followers</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-2 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <PostItem key={i} title={`Post title`} excerpt="Brief excerpt or description" />
                    ))}
                </TabsContent>

                <TabsContent value="followers" className="text-center text-sm text-muted-foreground mt-4">
                    Follower list goes here.
                </TabsContent>

                <TabsContent value="following" className="text-center text-sm text-muted-foreground mt-4">
                    Following list goes here.
                </TabsContent>
            </Tabs>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="font-semibold">{value}</div>
            <div className="text-muted-foreground">{label}</div>
        </div>
    );
}

function PostItem({ title, excerpt }: { title: string; excerpt: string }) {
    return (
        <Card className="p-3 flex justify-between items-center flex-row">
            <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                    <div className="text-sm font-medium">{title}</div>
                    <div className="text-xs text-muted-foreground">{excerpt}</div>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Card>
    );
}
