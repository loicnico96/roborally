import { HttpTrigger, HttpParams, HttpResponse } from "common/functions"
import { validateObject, SchemaValidators } from "common/utils/validation"
import { authenticationError, validationError } from "./errors"
import { functions } from "./functions"
import { UserId, UserInfo } from "common/model/UserInfo"
import { getUserInfo } from "./getUserInfo"

type FirebaseAuth = {
  uid: string
}

function validateAuth(auth: FirebaseAuth | undefined): UserId {
  if (auth === undefined) {
    throw authenticationError("Not unauthenticated")
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
  trigger: T,
  validators: SchemaValidators<HttpParams<T>>,
  handler: (
    data: HttpParams<T>,
    userId: UserId,
    userInfo: UserInfo
  ) => Promise<HttpResponse<T>>
): CallableFunction {
  return functions.https.onCall(async (payload: unknown, { auth }) => {
    try {
      const userId = validateAuth(auth)
      const data = validatePayload(payload, validators)
      const userInfo = await getUserInfo(userId)
      const response = await handler(data, userId, userInfo)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  })
}
