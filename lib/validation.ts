'use client'

import { z } from 'zod'

export const taskSchema = z.object({
	title: z.string().min(2).max(50),
})
