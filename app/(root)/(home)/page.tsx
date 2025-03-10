import { Button } from '@/components/ui/button'
import { featuredItems } from '@/constants'
import Image from 'next/image'
import React from 'react'

function HomePage() {
	return (
		<div className='h-screen w-full flex items-center'>
			<div className=' max-w-xl ml-60 flex h-full flex-col justify-center'>
				<h1 className='text-9xl font-semibold uppercase'>Workout with me</h1>
				<p className='text-muted-foreground'>
					Join our vibrant fitness community where we support and motivate each
					other. Whether you&apos;re just starting out or an experienced
					athlete, we&apos;ll help you reach your fitness goals through
					personalized workouts, expert guidance, and a supportive environment.
					Let&apos;s transform together.
				</p>
				<Button className='mt-10 w-fit'>Get Started</Button>
				<div className='mt-20'>
					<h1 className='uppercase text-muted-foreground'>As featured in</h1>
					<div className='flex items-center gap-4'>
						{featuredItems.map((Icon, index) => (
							<Icon key={index} className='text-4xl' />
						))}
					</div>
				</div>
			</div>
			<div className='w-1/4'>
				<Image src={'/men.png'} alt='hero' width={500} height={500} />
			</div>
		</div>
	)
}

export default HomePage
