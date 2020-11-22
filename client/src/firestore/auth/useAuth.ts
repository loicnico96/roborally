import firebase from "../../firebase"

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseUser = firebase.User
export type FirebaseUserCredential = firebase.auth.UserCredential

export enum AuthPersistence {
  LOCAL = "local",
  SESSION = "session",
  NONE = "none",
}

const auth = firebase.auth()

export function useAuth(): FirebaseAuth {
  return auth
}
