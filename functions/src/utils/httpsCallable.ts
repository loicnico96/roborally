import { functions } from "./functions"
import { authenticationError } from "./error"
import { validate, ObjectRecord, SchemaValidators } from "./validation"

export function httpsCallable<T extends ObjectRecord>(
  validators: SchemaValidators<T>,
  handler: (data: T, userId: string) => Promise<void>
): CallableFunction {
  // TODO: Remove default UID to enforce authentication
  return functions.https.onCall(async (data: unknown, { auth = { uid: "" } }) => {
    try {
      if (!auth) {
        throw authenticationError("Not unauthenticated")
      }

      await handler(validate(data, validators), auth.uid)
    } catch (error) {
      console.error(error)
      throw error
    }
  })
}
