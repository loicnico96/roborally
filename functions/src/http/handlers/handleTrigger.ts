import { HttpTrigger, HttpResponse, HttpParams } from "common/functions"
import { UserId, UserInfo } from "common/model/UserInfo"
import { SchemaValidators } from "common/utils/validation"

import { validatePayload } from "../../utils/validation"

export type HttpHandler<T extends HttpTrigger = HttpTrigger> = (
  data: unknown,
  userId: UserId,
  userInfo: UserInfo
) => Promise<HttpResponse<T>>

export function handleTrigger<T extends HttpTrigger>(
  schemaValidators: SchemaValidators<HttpParams<T>>,
  handler: (
    data: HttpParams<T>,
    userId: UserId,
    userInfo: UserInfo
  ) => Promise<HttpResponse<T>>
): HttpHandler<T> {
  return async function (payload: unknown, userId: UserId, userInfo: UserInfo) {
    const data = validatePayload(payload, schemaValidators)
    const response = await handler(data, userId, userInfo)
    return response
  }
}
