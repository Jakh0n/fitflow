import FeaturedItems from '@/components/shared/featuredItems'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function HomePage() {
	return (
		<div className='h-screen w-full flex items-center'>
			<div className=' lg:max-w-xl sm:max-w-sm md:max-w-md lg:ml-60 ml-20 md:ml-32 flex h-full flex-col justify-center'>
				<h1 className=' lg:text-9xl text-6xl md:text-8xl font-semibold uppercase'>
					Workout with me
				</h1>
				<p className='text-muted-foreground lg:text-xl md:text-lg sm:text-base text-sm'>
					Join our vibrant fitness community where we support and motivate each
					other. Whether you&apos;re just starting out or an experienced
					athlete, we&apos;ll help you reach your fitness goals through
					personalized workouts, expert guidance, and a supportive environment.
					Let&apos;s transform together.
				</p>
				<Button className='mt-10 w-fit lg:text-xl md:text-lg sm:text-base text-sm'>
					Get Started
				</Button>
				<div className='mt-10 lg:mt-20 md:mt-16'>
					<h1 className='uppercase text-muted-foreground'>As featured in</h1>
					<FeaturedItems />
				</div>
			</div>
			<div className='w-1/4 hidden lg:block'>
				<Image src={'/men.png'} alt='hero' width={500} height={500} />
			</div>
		</div>
	)
}

export default HomePage
