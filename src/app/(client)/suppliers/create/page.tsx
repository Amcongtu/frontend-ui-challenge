'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FiUpload } from 'react-icons/fi'
import { BackButton } from '@/components/layout/common/BackButton'
import { useState } from 'react'
import { useSupplierStore } from '@/stores/supplierStore'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, 'Business name is required'),
    category: z.string().min(1, 'Category is required'),
    website: z.string().url('Must be a valid URL'),
    description: z.string().min(1, 'Description is required'),
})

type FormData = z.infer<typeof formSchema>

export default function SupplierFormPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageFile, setImageFile] = useState<File | null>(null)
    const addSupplier = useSupplierStore((state) => state.addSupplier)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const categoryValue = watch('category')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = (data: FormData) => {
        if (!imagePreview) {
            alert('Please upload a logo image.')
            return
        }

        const newSupplier = {
            id: Date.now(),
            name: data.name,
            category: data.category,
            description: data.description,
            rating: 0,
            image: imagePreview,
            website: data.website,
            requestInfoEmail: 'example@supplier.com',
            location: 'Unknown',
            services: [],
        }

        addSupplier(newSupplier)
        alert('Supplier added!')
        router.push('/suppliers')
    }

    return (
        <div className="h-full overflow-auto p-4 bg-white dark:bg-gray-900">
            <BackButton />
            <div className="w-full max-w-md space-y-6">
                <header className="text-center">
                    <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">
                        Apply to Be a Supplier
                    </h2>
                </header>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Business Name
                        </label>
                        <Input
                            {...register('name')}
                            placeholder="Business Name"
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                        </label>
                        <Select
                            value={categoryValue}
                            onValueChange={async (val) => {
                                setValue('category', val)
                                await trigger('category')
                            }}
                        >
                            <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                                <SelectItem value="tech" className="dark:hover:bg-gray-700">Technology</SelectItem>
                                <SelectItem value="fashion" className="dark:hover:bg-gray-700">Fashion</SelectItem>
                                <SelectItem value="food" className="dark:hover:bg-gray-700">Food</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                        <Input
                            type="url"
                            {...register('website')}
                            placeholder="https://example.com"
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <Textarea
                            {...register('description')}
                            placeholder="Description"
                            rows={4}
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">
                            Logo
                        </label>
                        <label className="block w-fit cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <div className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FiUpload className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                )}
                            </div>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                    >
                        Submit for Review
                    </Button>
                </form>
            </div>
        </div>
    )
}
