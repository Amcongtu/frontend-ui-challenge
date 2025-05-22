import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    Share2,
    User,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { events } from "@/data/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BackButton } from "@/components/layout/common/BackButton";
import Link from "next/link";

interface EventPageProps {
    params: { eventId: string };
}
function getRandomEventId(currentId: number) {
    const otherEvents = events.filter(e => e.id !== currentId);
    if (otherEvents.length === 0) {
        return currentId;
    }
    const randomIndex = Math.floor(Math.random() * otherEvents.length);
    let randomId = otherEvents[randomIndex].id;

    if (randomId === currentId) {
        randomId = otherEvents[(randomIndex + 1) % otherEvents.length].id;
    }

    return randomId;
}


export default function EventDetailPage({ params }: EventPageProps) {
    const eventId = Number(params.eventId);
    const event = events.find((e) => e.id === eventId);

    if (!event) return notFound();

    return (
        <Card className="max-w-md mx-auto p-4 space-y-4 h-full overflow-auto">
            <BackButton />
            {/* Event Image */}
            <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={192}
                className="w-full h-auto max-h-48 rounded mb-4 object-cover"
            />

            {/* Title + Sponsored */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">{event.title}</h1>
                {event.sponsored && <Badge variant="secondary">Sponsored</Badge>}
            </div>

            {/* Date & Time */}
            <div className="flex gap-4 text-sm text-muted-foreground items-center">
                <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
            </div>

            {/* RSVP + Calendar */}
            <div className="flex gap-2">
                <Button className="flex-1">RSVP</Button>
                <Button variant="outline" size="icon">
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <Button variant="secondary" className="w-full">
                Add to Calendar
            </Button>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
                {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>

            <Separator />

            {/* Description */}
            <div>
                <h2 className="font-semibold text-sm">Description</h2>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            </div>

            <Separator />

            {/* Organizer Info */}
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>
                        {event.organizer.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium text-sm">{event.organizer.name}</div>
                    <div className="text-xs text-muted-foreground">{event.organizer.bio}</div>
                </div>
            </div>

            {/* Attendees */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                You and {event.attendees} others are attending
            </div>

            <Separator />

            {/* Share + Related */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                </Button>
                <Link href={`/event/${getRandomEventId(eventId)}`} className="div text-sm text-blue-600 hover:underline cursor-pointer">
                    Related Events →
                </Link>
            </div>
        </Card>
    );
}
