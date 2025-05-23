'use client'

import {
    useForm,
    SubmitHandler
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Event, EventType, useEventStore } from '@/stores/useEventStore'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { BackButton } from '@/components/layout/common/BackButton'

const formSchema = z.object({
    title: z.string().min(3, 'Title is required and should be at least 3 characters'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    location: z.string().min(1, 'Location is required'),
    isOnline: z.boolean(),
    type: z.nativeEnum(EventType, {
        errorMap: () => ({ message: 'Event type is required' }),
    }),
    website: z.string().url('Must be a valid URL'),
    description: z.string().min(1, 'Description is required'),
})

type FormData = z.infer<typeof formSchema>

export default function CreateEventPage() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { addEvent } = useEventStore()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isOnline: false,
            type: EventType.BY_REGION,
            website: '',
            description: '',
        }
    })

    const isOnline = watch('isOnline')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newEvent: Event = {
            id: Date.now(),
            image: imagePreview || 'https://picsum.photos/200/300',
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            isOnline: data.isOnline,
            type: data.type,
            website: data.website,
            description: data.description,
            tags: [],
            sponsored: false,
            organizer: {
                name: 'Unknown Organizer',
                bio: 'No bio available',
                avatar: '/default-avatar.png',
            },
            attendees: 0,
        }

        addEvent(newEvent)

        alert('Event Created!')
        router.push('/event')
    }

    return (
        <div className="max-w-md mx-auto h-full overflow-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <BackButton />

                <h2 className="text-lg font-semibold">Basic Info</h2>

                <Input
                    placeholder="Event Name"
                    {...register('title')}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                <div className="grid grid-cols-2 gap-2">
                    <Input
                        type="date"
                        {...register('date')}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                    <Input
                        type="time"
                        {...register('time')}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                </div>

                <Input
                    placeholder="Location (e.g. 'London')"
                    {...register('location')}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

                <div className="flex items-center justify-between">
                    <Label className="text-sm">Online</Label>
                    <Switch
                        checked={isOnline}
                        onCheckedChange={(value) => setValue('isOnline', value)}
                    />
                </div>

                {/* Select Event Type */}
                <div>
                    <Label className="text-sm mb-1 block">Event Type</Label>
                    <select
                        {...register('type')}
                        className="w-full rounded-md border dark:bg-gray-800 dark:border-gray-700 dark:text-white px-3 py-2"
                    >
                        {Object.values(EventType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                <div>
                    <Label className="text-sm mb-1 block">Website</Label>
                    <Input
                        placeholder="https://picsum.photos/200/300"
                        {...register('website')}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
                </div>

                <div>
                    <Label className="text-sm mb-1 block">Description</Label>
                    <Textarea
                        placeholder="Description"
                        {...register('description')}
                        rows={3}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md w-full h-36 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <input type="file" onChange={handleImageChange} className="hidden" />
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
                        ) : (
                            <>
                                <img src="https://picsum.photos/200/300" alt="Upload" className="w-10 h-10 opacity-60" />
                                <p className="mt-2 text-sm">Upload Image</p>
                            </>
                        )}
                    </label>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                    Create Event
                </Button>
            </form>
        </div>
    )
}
