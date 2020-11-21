import { https } from "firebase-functions"

export const { HttpsError } = https

export function authenticationError(message: string) {
  return new HttpsError("unauthenticated", message)
}

export function notFoundError(message: string) {
  return new HttpsError("not-found", message)
}

export function permissionError(message: string) {
  return new HttpsError("permission-denied", message)
}

export function preconditionError(message: string) {
  return new HttpsError("failed-precondition", message)
}

export function validationError(message: string) {
  return new HttpsError("invalid-argument", message)
}
