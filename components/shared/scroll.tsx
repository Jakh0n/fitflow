import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import TaskItem from './task-item'
import { ITask } from '@/types'

interface Props {
	tasks: ITask[]
}

export function ScrollAreaDemo({ tasks }: Props) {
	return (
		<ScrollArea className='rounded-md border h-80 w-full'>
			<div className='flex flex-col space-y-3 w-full'>
				{tasks.map((task, idx) => (
					<TaskItem key={idx} task={task} />
				))}
			</div>
		</ScrollArea>
	)
}
