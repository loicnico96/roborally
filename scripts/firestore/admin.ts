import firebaseAdminSdk from "firebase-admin"
import FIREBASE_ADMIN_SERVICE_ACCOUNT from "./firebase-adminsdk.json"
const FIREBASE_DATABASE_URL = "https://roborally-e518d.firebaseio.com"
const FIREBASE_ADMIN_CREDENTIALS = firebaseAdminSdk.credential.cert(
  FIREBASE_ADMIN_SERVICE_ACCOUNT as firebaseAdminSdk.ServiceAccount
)

firebaseAdminSdk.initializeApp({
  credential: FIREBASE_ADMIN_CREDENTIALS,
  databaseURL: FIREBASE_DATABASE_URL,
})

export const firestoreAdmin = firebaseAdminSdk.firestore()
