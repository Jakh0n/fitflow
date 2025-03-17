'use client'

import { Edit2, Loader2, Trash } from 'lucide-react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { ITask } from '@/types'
import { RxReload } from 'react-icons/rx'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { toast } from 'sonner'

interface Props {
	task: ITask
	onStartEditing: () => void
	onDeleteTask: () => void
}

const TaskItem = ({ task, onStartEditing, onDeleteTask }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const onStart = async () => {
		setIsLoading(true)
		try {
			const ref = doc(db, 'tasks', task.id)
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
		} catch (error) {
			toast.error(`Failed to start task: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}

	const onPause = async () => {
		setIsLoading(true)
		try {
			const ref = doc(db, 'tasks', task.id)
			await updateDoc(ref, {
				status: 'paused',
				endTime: Date.now(),
				totalTime: task.totalTime + Date.now() - task.startTime,
			})
		} catch (error) {
			toast.error(`Failed to pause task: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}

	const onResume = async () => {
		setIsLoading(true)
		try {
			const ref = doc(db, 'tasks', task.id)
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
		} catch (error) {
			toast.error(`Failed to resume task: ${error}`)
		} finally {
			setIsLoading(false)
		}
	}

	const renderBtns = () => {
		switch (task.status) {
			case 'unstarted':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onStart}
						disabled={isLoading}
					>
						<CiPlay1 className='w-5 h-5 text-indigo-500' />
					</Button>
				)
			case 'in_progress':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onPause}
						disabled={isLoading}
					>
						<CiPause1 className='w-5 h-5 text-indigo-500' />
					</Button>
				)
			case 'paused':
				return (
					<Button
						variant={'ghost'}
						size={'icon'}
						className='w-8 h-8'
						onClick={onResume}
						disabled={isLoading}
					>
						<RxReload className='w-5 h-5 text-indigo-500' />
					</Button>
				)
			default:
				return null
		}
	}
	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			<div className='flex gap-1 items-center col-span-2'>
				<MdOutlineTaskAlt className='text-blue-500' />
				<span className='capitalize'>{task.title}</span>
			</div>
			<div className='flex gap-1 items-center'>
				<HiStatusOnline />
				<span className='capitalize text-sm '>{task.status}</span>
			</div>
			<div className='flex gap-1 items-center justify-self-end'>
				{isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
				{renderBtns()}
				<Button
					variant={'secondary'}
					size={'icon'}
					className='w-8 h-8'
					onClick={onStartEditing}
				>
					<Edit2 className='w-5 h-5' />
				</Button>

				<Button
					variant={'destructive'}
					size={'icon'}
					className='w-8 h-8'
					onClick={onDeleteTask}
				>
					<Trash className='w-5 h-5' />
				</Button>
			</div>
		</Card>
	)
}

export default TaskItem
