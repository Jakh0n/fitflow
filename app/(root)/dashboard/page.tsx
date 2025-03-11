import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BadgePlus } from 'lucide-react'
import React from 'react'

function dashboardPage() {
	return (
		<div className='h-screen items-center max-w-6xl w-full flex container mx-auto '>
			<div className='grid grid-cols-2 gap-8 w-full items-center'>
				<div className='flex flex-col space-y-3 '>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
						<h1 className='text-2xl font-bold'>Trainings</h1>
						<Button className=' rounded-md'>
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
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
					<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
					<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default dashboardPage
