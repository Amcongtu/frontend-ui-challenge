import { events } from '@/data/events'
import { create } from 'zustand'

export enum EventType {
    UPCOMING_THIS_MONTH = 'upcoming-this-month',
    BY_REGION = 'by-region',
    BY_TYPE = 'by-type',
    SPONSORED = 'sponsored',
}

export interface Event {
    id: number
    title: string
    date: string
    time: string
    location: string
    tags: string[]
    image: string
    description: string
    sponsored: boolean
    organizer: {
        name: string
        avatar: string
        bio: string
    }
    attendees: number
    type: EventType
    isOnline?: boolean
    website?: string
}

interface EventStore {
    events: Event[]
    addEvent: (event: Event) => void
    updateEvent: (id: number, updatedEvent: Partial<Event>) => void
    deleteEvent: (id: number) => void
}


export const useEventStore = create<EventStore>((set) => ({
    events: events,
    addEvent: (event) =>
        set((state) => ({
            events: [...state.events, event],
        })),
    updateEvent: (id, updatedEvent) =>
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, ...updatedEvent } : event
            ),
        })),
    deleteEvent: (id) =>
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        })),
}))
