import {  getDocs } from 'firebase/firestore'

import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import { ITask } from '@/types'

export const TaskService = async (colName: string) => {
	const snapshot = await getDocs(collection(db, colName))

	return snapshot.docs.map(doc => ({
		...doc.data(),
		id: doc.id,
	})) as ITask[]
}
