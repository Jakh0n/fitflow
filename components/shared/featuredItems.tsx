'use client'
import { featuredItems } from '@/constants'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

function FeaturedItems() {
	return (
		<div className='flex items-center gap-4 mt-4'>
			<Carousel
				opts={{ loop: true, align: 'start' }}
				plugins={[Autoplay({ delay: 2000 })]}
			>
				<CarouselContent>
					{featuredItems.map((Icon, index) => (
						<CarouselItem key={index} className='basis-1/6'>
							<Icon className='lg:text-5xl md:text-4xl text-3xl ' />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}

export default FeaturedItems
