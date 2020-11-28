import { UserId, UserInfo } from "common/model/UserInfo"

import { validateAuth, getUserInfo } from "./auth"
import { functions } from "./functions"

export function httpsCallable<R>(
  handler: (data: unknown, userId: UserId, userInfo: UserInfo) => Promise<R>
): CallableFunction {
  return functions.https.onCall(async (data: unknown, { auth }) => {
    try {
      const userId = validateAuth(auth)
      const userInfo = await getUserInfo(userId)
      const response = await handler(data, userId, userInfo)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  })
}
