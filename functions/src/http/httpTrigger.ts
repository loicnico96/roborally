import { httpsCallable } from "../utils/httpsCallable"
import {
  required,
  validateUnknown,
  validateEnum,
} from "common/utils/validation"
import { HttpTrigger } from "common/functions"
import HANDLERS from "./handlers"
import { validatePayload } from "../utils/validation"

export type HttpPayload<T extends HttpTrigger = HttpTrigger> = {
  trigger: T
  data: unknown
}

const validationSchema = {
  trigger: required(validateEnum(HttpTrigger)),
  data: required(validateUnknown()),
}

export default httpsCallable(async (data, userId, userInfo) => {
  const payload = validatePayload<HttpPayload>(data, validationSchema)
  const handler = HANDLERS[payload.trigger]
  const response = await handler(payload.data, userId, userInfo)
  return response
})
