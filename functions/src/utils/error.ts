import { https } from "firebase-functions"

export const HttpsError = https.HttpsError

export function authenticationError(message: string) {
  return new HttpsError("unauthenticated", message)
}

export function preconditionError(message: string) {
  return new HttpsError("failed-precondition", message)
}

export function validationError(message: string) {
  return new HttpsError("invalid-argument", message)
}
