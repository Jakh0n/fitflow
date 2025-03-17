'use client'
import { taskSchema } from '@/lib/validation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface Props {
	title?: string
	isEdit?: boolean
	onClose?: () => void | null
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

function TaskForm({ handler, title, isEdit, onClose }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: title || '',
		},
	})

	const onSubmit = (values: z.infer<typeof taskSchema>) => {
		setIsLoading(true)
		const promise = handler(values).finally(() => setIsLoading(false))
		toast.promise(promise, {
			loading: 'Creating task...',
			success: 'Task created successfully',
			error: 'Failed to create task',
		})
	}
	return (
		<>
			{isLoading && (
				<Loader2 className='w-4 h-4 animate-spin z-50 absolute top-1/2 left-1/2' />
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Let's do it..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-4'>
						{isEdit && (
							<Button type='button' variant={'destructive'} onClick={onClose}>
								cancel
							</Button>
						)}
						<Button type='submit'>Submit</Button>
					</div>
				</form>
			</Form>
		</>
	)
}

export default TaskForm
