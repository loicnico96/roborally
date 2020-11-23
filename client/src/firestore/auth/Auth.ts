import firebase from "../../firebase"

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseUser = firebase.User
export type FirebaseUserCredential = firebase.auth.UserCredential

export default firebase.auth()
