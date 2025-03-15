'use client'
import TaskForm from '@/components/form/form'
import { ScrollAreaDemo } from '@/components/shared/scroll'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { ITask } from '@/types'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection } from 'firebase/firestore'
import { BadgePlus, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

function DashboardPage() {
	const { user } = useUser()
	const [isOpen, setIsOpen] = useState(false)
	const [tasks, setTasks] = useState<ITask[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const handleTasks = async () => {
		setIsLoading(true)
		try {
			const tasks = await TaskService('tasks')
			setTasks(tasks)
		} catch (error) {
			toast.error(`Failed to load tasks: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}

	const onAddTask = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user?.id) return

		const promise = (async () => {
			const docRef = await addDoc(collection(db, 'tasks'), {
				title,
				status: 'unstarted',
				startTime: 0,
				endTime: 0,
				totalTime: 0,
				userId: user.id,
			})

			setIsOpen(false)

			const newTask: ITask = {
				id: docRef.id,
				title,
				status: 'unstarted',
				startTime: 0,
				endTime: 0,
				totalTime: 0,
				userId: user.id,
			}

			setTasks(prev => [...prev, newTask])
			return newTask
		})()

		toast.promise(promise, {
			loading: 'Adding task...',
			error: 'Failed to add task',
		})
	}

	useEffect(() => {
		handleTasks()
	}, [])

	return (
		<>
			<div className='h-screen items-center max-w-6xl w-full flex container mx-auto '>
				<div className=' mt-[30vh] md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full items-center'>
					<div className='flex flex-col space-y-3 '>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<h1 className='text-xl lg:text-2xl font-bold'>Trainings</h1>
							<Button
								variant={'outline'}
								onClick={() => {
									setIsOpen(true)
								}}
							>
								<BadgePlus className='w-4 h-4' />
							</Button>
						</div>
						<Separator className='my-4' />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							{isLoading ? (
								<Loader2 className='w-8 h-8 animate-spin' />
							) : (
								<ScrollAreaDemo tasks={tasks} />
							)}
						</div>
					</div>
					<div className='flex flex-col space-y-3 relative w-full'>
						<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24'>
							<div className='text-xl lg:text-2xl font-bold'>Total week</div>
							<div className='text-2xl lg:text-3xl font-bold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
							<div className='text-xl lg:text-2xl font-bold'>Total week</div>
							<div className='text-2xl lg:text-3xl font-bold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
							<div className='text-xl lg:text-2xl font-bold'>Total week</div>
							<div className='text-2xl lg:text-3xl font-bold'>02:08:47</div>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
					</DialogHeader>
					<DialogContent>
						<TaskForm handler={onAddTask} />
					</DialogContent>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default DashboardPage
