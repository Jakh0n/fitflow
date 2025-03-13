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
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { useUser } from '@clerk/nextjs'
import { addDoc, collection } from 'firebase/firestore'
import { BadgePlus } from 'lucide-react'
import React, { useState } from 'react'
import { z } from 'zod'

function DashboardPage() {
	const { user } = useUser()
	const [isOpen, setIsOpen] = useState(false)

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null
		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user?.id,
		}).then(() => {
			setIsOpen(false)
		})
	}
	return (
		<>
			<div className='h-screen items-center max-w-6xl w-full flex container mx-auto '>
				<div className=' max-sm:mt-24 max-md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full items-center'>
					<div className='flex flex-col space-y-3 '>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<h1 className='text-xl lg:text-2xl font-bold'>Trainings</h1>
							<Button variant={'outline'} onClick={() => setIsOpen(true)}>
								<BadgePlus className='w-4 h-4' />
							</Button>
						</div>
						<Separator className='my-4' />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							<div className='flex flex-col space-y-3 w-full'>
								{Array.from({ length: 3 }).map((_, idx) => (
									<TaskItem key={idx} />
								))}
							</div>
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
						<TaskForm handler={onAdd} />
					</DialogContent>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default DashboardPage
