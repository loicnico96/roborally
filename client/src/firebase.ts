import firebase from "firebase/app"

import firebaseConfig from "./config/firebase-config"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

firebase.initializeApp(firebaseConfig)
export default firebase
