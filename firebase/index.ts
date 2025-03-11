import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCZWZNghpLKDgHw4tqMX_AWnocG3gSX9lU',
	authDomain: 'fitflow-de05d.firebaseapp.com',
	projectId: 'fitflow-de05d',
	storageBucket: 'fitflow-de05d.firebasestorage.app',
	messagingSenderId: '929608459658',
	appId: '1:929608459658:web:409b0f0d64d9f47f7c1473',
	measurementId: 'G-BJP0LDP3FX',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
