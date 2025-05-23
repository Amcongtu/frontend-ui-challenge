'use client';

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/stores/search";
import { FaSearch } from 'react-icons/fa';

export default function HomePage() {
  const user = useUserStore((state) => state.user);
  const [input, setInput] = useState('');
  const setQuery = useSearchStore((state) => state.setQuery);
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setQuery(input.trim());
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  }
  const handleButtonClick = () => {
    if (input.trim()) {
      setQuery(input.trim());
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };
  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto h-full overflow-auto">
      {/* Welcome + Search */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome back, {user?.name} 👋</h1>
        <div className="relative w-full max-w-md mx-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              handleButtonClick()
            }}
            className="absolute cursor-pointer right-1 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Trending Posts */}
      <Section title="Trending Posts">
        {[1, 2].map((i) => (
          <PostCard key={i} title="Post Title" summary="Summary are to text" likes={21 - i} comments={5 - i} />
        ))}
      </Section>

      {/* Bookmarked Posts */}
      <Section title="Bookmarked Posts">
        {[1, 2].map((i) => (
          <PostCard key={i} title="Post Title" summary="Summary are to text" likes={16 - i} comments={2 - i} />
        ))}
      </Section>

      {/* Upcoming Events */}
      <Section title="Upcoming Events">
        {[1, 2].map((i) => (
          <EventCard
            key={i}
            title={i === 1 ? "Mark-tan August 3" : "October 24—2023"}
            date={i === 1 ? "Jun. 26 • 10:00 a.m." : "Apr 11 • SEO"}
            tag={i === 1 ? "Technical" : "SEO"}
          />
        ))}
      </Section>
    </div>
  );
}

// Section wrapper with "View All"
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <Button variant="link" className="text-sm p-0 h-auto">View All</Button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// Post card UI
function PostCard({ title, summary, likes, comments }: { title: string; summary: string; likes: number; comments: number }) {
  return (
    <Card className="p-3 flex justify-between items-start flex-row h-full">
      <div className="flex gap-3">
        <div className="rounded-full bg-gray-300 w-10 h-10 border border-gray-600" />
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className="text-muted-foreground text-sm">{summary}</div>
        </div>
      </div>
      <div className="flex gap-3 text-muted-foreground text-sm items-center h-full  self-center">
        <div className="flex items-center gap-1"><Heart className="w-4 h-4" /> {likes}</div>
        <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {comments}</div>
      </div>
    </Card>
  );
}

// Event card UI
function EventCard({ title, date, tag }: { title: string; date: string; tag: string }) {
  return (
    <Card className="p-3 flex gap-3 items-start flex-row">
      <div className="rounded-md bg-gray-300 w-16 h-16 border border-gray-600" />
      <div className="flex-1 space-y-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{date}</div>
        <Badge variant="outline" className="text-xs bg-fuchsia-100/50">{tag}</Badge>
      </div>
      <Button size="sm" variant="outline" className="text-xs mt-1 ">RSVP’d</Button>
    </Card>
  );
}
