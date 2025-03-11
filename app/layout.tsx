import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})
export const metadata: Metadata = {
	// metadataBase: new URL(''),
	title: 'FitFlow',
	description:
		'FitFlow is a platform that provides personalized workout plans, fitness coaching, and a community of fitness enthusiasts.',
	authors: [{ name: 'Jakhon Yokubov', url: 'localhost:3000' }],
	icons: {
		icon: '/favicon.png',
		shortcut: '/favicon.png',
	},
	keywords:
		'FitFlow, fitness, workout plans, home workouts, weight loss, muscle building, strength training, online fitness coaching, fitness tracker apps, HIIT workouts, yoga for beginners, fitness motivation, fitness community, healthy lifestyle, wellness coaching, personalized workout plans, fitness transformation, fitness programs',
	openGraph: {
		title: 'FitFlow',
		description:
			'FitFlow is a platform that provides personalized workout plans, fitness coaching, and a community of fitness enthusiasts.',
		type: 'website',
		url: 'https://fitflow.org',
		locale: 'en_EN',
		images: '/favicon.png',
		countryName: 'South Korea',
		siteName: 'FitFlow',
		emails: 'info@fitflow.org',
	},
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable}`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
					<Toaster position='top-center' richColors />
				</body>
			</html>
		</ClerkProvider>
	)
}
