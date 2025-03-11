'use client'
import FeaturedItems from '@/components/shared/featuredItems'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { programs } from '@/constants'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

function HomePage() {
	const router = useRouter()

	return (
		<>
			<div className='h-screen w-full flex items-center'>
				<div className=' lg:max-w-xl sm:max-w-sm md:max-w-md lg:ml-60 ml-9 max-sm:mr-8 md:ml-32 flex h-full flex-col justify-center'>
					<h1 className=' lg:text-9xl text-6xl md:text-8xl font-semibold uppercase'>
						Workout with me
					</h1>
					<p className='text-muted-foreground lg:text-xl md:text-lg sm:text-base text-sm'>
						Join our vibrant fitness community where we support and motivate
						each other. Whether you&apos;re just starting out or an experienced
						athlete, we&apos;ll help you reach your fitness goals through
						personalized workouts, expert guidance, and a supportive
						environment. Let&apos;s transform together.
					</p>
					<SignedOut>
						<SignInButton mode='modal'>
							<Button className='mt-10 w-fit text-sm'>Get Started</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<div className='flex items-center gap-2 mt-10'>
							<Button onClick={() => router.push('/dashboard')}>
								Got to gym{' '}
							</Button>
							<SignOutButton>
								<Button
									className='w-fit flex items-center gap-2'
									variant={'destructive'}
								>
									<h1 className='font-semibold text-sm'>Sign out</h1>
									<LogOutIcon className='w-4 h-4' />
								</Button>
							</SignOutButton>
						</div>
					</SignedIn>

					<div className='mt-10 lg:mt-20 md:mt-16'>
						<h1 className='uppercase text-muted-foreground'>As featured in</h1>
						<FeaturedItems />
					</div>
				</div>
				<div className='w-1/4 hidden lg:block'>
					<Image src={'/men.png'} alt='hero' width={500} height={500} />
				</div>
			</div>

			<div className='container max-w-5xl mx-auto '>
				<h1 className='text-3xl lg:text-4xl font-semibold '>
					Not Sure What To Do?
				</h1>
				<p className='text-muted-foreground text-sm lg:text-base'>
					Our platform offers a wide range of workout plans, from beginner to
					advanced, to help you achieve your fitness goals.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
					{programs.map(program => (
						<Card
							key={program.title}
							className='group relative cursor-pointer p-8'
						>
							<h1 className='text-xl font-semibold mb-2 lg:text-2xl lg:mb-4'>
								{program.title}
							</h1>
							<p className='text-muted-foreground'>{program.descr}</p>
							<Button
								size={'icon'}
								className='group-hover:translate-x-1 transition-transform absolute right-2 top-1/2'
								variant={'ghost'}
							>
								<FaArrowRightLong />
							</Button>
						</Card>
					))}
				</div>
			</div>
		</>
	)
}

export default HomePage
