import { functions } from "./functions"
// import { authenticationError } from "./errors"
import { validate, SchemaValidators } from "./validation"
import { HttpTrigger, HttpParams, HttpResponse } from "common/functions"

export function httpsCallable<T extends HttpTrigger>(
  validators: SchemaValidators<HttpParams<T>>,
  handler: (data: HttpParams<T>, userId: string) => Promise<HttpResponse<T>>
): CallableFunction {
  // TODO: Remove default UID to enforce authentication
  return functions.https.onCall(
    async (data: unknown, { auth = { uid: "" } }) => {
      try {
        // if (!auth) {
        //   throw authenticationError("Not unauthenticated")
        // }

        const response = await handler(validate(data, validators), auth.uid)
        return response
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  )
}
