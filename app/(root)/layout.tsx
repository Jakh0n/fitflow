import React from 'react'
import { ChildProps } from '@/types'
import Navbar from '@/components/shared/navbar'

function Layout({ children }: ChildProps) {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	)
}

export default Layout
