import firebase from "../firebase"
import { Firestore } from "./types"

const firestore = firebase.firestore()

export function useFirestore(): Firestore {
  return firestore
}
