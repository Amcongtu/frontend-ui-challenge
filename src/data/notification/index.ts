export type NotificationItem = {
    id: number;
    icon: string; // 'comment' | 'check' | 'calendar' | 'info'
    title: string;
    description: string;
    time: string;
    date: string; // "Today" | "Yesterday"
};

export const notifications: NotificationItem[] = [
    {
        id: 1,
        icon: "comment",
        title: "New comment on your post",
        description: "Someone commented on your post",
        time: "2h ago",
        date: "Today",
    },
    {
        id: 2,
        icon: "check",
        title: "Your supplier listing was approved",
        description: "Your application has been approved",
        time: "6h ago",
        date: "Today",
    },
    {
        id: 3,
        icon: "calendar",
        title: "New RSVP for your event",
        description: "A user has RSVP’d to your event",
        time: "9h ago",
        date: "Today",
    },
    {
        id: 4,
        icon: "info",
        title: "Event submitted for review",
        description: "System: Your event has been submitted",
        time: "10h ago",
        date: "Today",
    },
    {
        id: 5,
        icon: "comment",
        title: "You were mentioned in a post",
        description: "Someone mentioned you in a post",
        time: "1d ago",
        date: "Yesterday",
    },
    {
        id: 6,
        icon: "comment",
        title: "You were mentioned in a post",
        description: "Someone mentioned you in a post",
        time: "1d ago",
        date: "Yesterday",
    },
];
