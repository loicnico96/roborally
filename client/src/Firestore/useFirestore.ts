import firebase from 'firebase'
import { Firestore } from './types'

const firestore = firebase.firestore()

function useFirestore(): Firestore {
  return firestore
}

export default useFirestore
