import { navLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import ModeToggle from './mode-toggle'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

function Navbar() {
	return (
		<div className='fixed inset-0 z-50 bg-background/50 backdrop-blur-sm h-[10vh]'>
			<div className='container mx-auto flex justify-between items-center h-full'>
				<Logo />
				<div className='flex items-center gap-4'>
					<ModeToggle />
					<SignedIn>
						{navLinks.map(link => (
							<Link
								key={link.label}
								href={link.path}
								className='text-sm font-medium hover:text-primary transition-colors duration-300'
							>
								{link.label}
							</Link>
						))}
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<Button>Sign in</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Navbar
