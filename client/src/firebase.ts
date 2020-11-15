import firebaseConfig from "./config/firebase-config"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/functions"

firebase.initializeApp(firebaseConfig)
export default firebase
