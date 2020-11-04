// import { authenticationError } from "./errors"
import { HttpTrigger, HttpParams, HttpResponse } from "common/functions"
import { validateObject, SchemaValidators } from "common/utils/validation"
import { validationError } from "./errors"
import { functions } from "./functions"

type FirebaseAuth = {
  uid: string
}

function validateAuth(auth: FirebaseAuth | undefined): string {
  if (auth === undefined) {
    // TODO: Remove default UID and enforce authentication
    // throw authenticationError("Not unauthenticated")
    return ""
  }

  return auth.uid
}

function validatePayload<T extends HttpTrigger>(
  payload: unknown,
  validators: SchemaValidators<HttpParams<T>>
): HttpParams<T> {
  try {
    return validateObject(validators)(payload)
  } catch (error) {
    throw validationError(error.message)
  }
}

export function httpsCallable<T extends HttpTrigger>(
  validators: SchemaValidators<HttpParams<T>>,
  handler: (data: HttpParams<T>, userId: string) => Promise<HttpResponse<T>>
): CallableFunction {
  return functions.https.onCall(async (payload: unknown, { auth }) => {
    try {
      const userId = validateAuth(auth)
      const data = validatePayload(payload, validators)
      const response = await handler(data, userId)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  })
}
