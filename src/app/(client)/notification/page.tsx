"use client";

import { notifications, type NotificationItem } from "@/data/notification";
import {
    MessageSquare,
    CheckCircle,
    Calendar,
    Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

const iconMap: Record<NotificationItem["icon"], JSX.Element> = {
    comment: <MessageSquare className="w-5 h-5 text-muted-foreground" />,
    check: <CheckCircle className="w-5 h-5 text-muted-foreground" />,
    calendar: <Calendar className="w-5 h-5 text-muted-foreground" />,
    info: <Info className="w-5 h-5 text-muted-foreground" />,
};

export default function NotificationPage() {
    const grouped = notifications.reduce((acc, item) => {
        acc[item.date] = acc[item.date] || [];
        acc[item.date].push(item);
        return acc;
    }, {} as Record<string, NotificationItem[]>);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="link" className="text-sm p-0 h-auto">Mark all as read</Button>
            </div>

            {Object.entries(grouped).map(([date, items]) => (
                <Card key={date}>
                    <CardContent className="p-4">
                        {date !== "Today" && (
                            <div className="text-sm font-medium text-muted-foreground mb-3">{date}</div>
                        )}

                        {items.map((item, index) => (
                            <div key={item.id}>
                                <div className="flex items-start gap-3 py-3">
                                    <div className="mt-1 shrink-0">{iconMap[item.icon]}</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{item.title}</div>
                                        <div className="text-xs text-muted-foreground">{item.description}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</div>
                                </div>
                                {index < items.length - 1 && <Separator />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
