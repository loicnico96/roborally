import firebase from "../../firebase"

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseUser = firebase.User
export type FirebaseUserCredential = firebase.auth.UserCredential

const auth = firebase.auth()

export function useAuth(): FirebaseAuth {
  return auth
}
