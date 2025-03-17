'use client'
import TaskForm from '@/components/form/form'
import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/service/task.service'
import { ITask } from '@/types'
import { useUser } from '@clerk/nextjs'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore'
import { BadgePlus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

function DashboardPage() {
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)
	const [isEditing, setIsEditing] = useState(false)
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
		if (!user?.id) return null

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
	}
	const onEditTask = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user?.id) return null
		if (!currentTask?.id) return null

		const ref = doc(db, 'tasks', currentTask.id)
		await updateDoc(ref, {
			title,
		})

		setIsEditing(false)

		const updatedTask: ITask = {
			...currentTask,
			title,
		}

		setTasks(prevTasks =>
			prevTasks.map(task => (task.id === currentTask.id ? updatedTask : task))
		)
	}

	const onStartEditing = (task: ITask | null) => {
		setCurrentTask(task)
		setIsEditing(true)
	}

	const onDeleteTask = async (taskId: string) => {
		if (!taskId) return null
		try {
			const ref = doc(db, 'tasks', taskId)
			await deleteDoc(ref)
			setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
			toast.success('Task deleted successfully')
		} catch (error) {
			toast.error(`Failed to delete task: ${error}`)
		}
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
						{tasks.length > 0 ? (
							<div className='w-full flex-col p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
								{isEditing ? (
									<TaskForm
										title={currentTask?.title}
										isEdit={true}
										onClose={() => setIsEditing(false)}
										handler={onEditTask}
									/>
								) : (
									<>
										{isLoading ? (
											<Loader2 className='w-8 h-8 animate-spin' />
										) : (
											<ScrollArea className='rounded-md border h-80 w-full'>
												<div className='flex flex-col space-y-3 w-full'>
													{tasks.map((task, idx) => (
														<TaskItem
															key={idx}
															task={task}
															onStartEditing={() => onStartEditing(task)}
															onDeleteTask={() => onDeleteTask(task.id)}
														/>
													))}
												</div>
											</ScrollArea>
										)}
									</>
								)}
							</div>
						) : (
							<div className='w-full flex-col p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
								<div className='flex items-center justify-center h-full'>
									<Image
										src={'/nodata.gif'}
										alt='task'
										width={100}
										height={100}
										className='flex items-center justify-center'
									/>
								</div>
								<p className='text-center text-md font-mono'>No tasks found</p>
								<p className='text-center text-md font-mono'>
									Add a task to get started
								</p>
								<Button
									onClick={() => {
										setIsOpen(true)
									}}
									className='w-fit mx-auto mt-4 pt-5 pb-5 pr-20 pl-20'
								>
									<BadgePlus className='w-4 h-4' />
								</Button>
							</div>
						)}
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
