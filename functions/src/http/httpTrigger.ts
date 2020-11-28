import { HttpTrigger } from "common/functions"
import {
  required,
  validateUnknown,
  validateEnum,
} from "common/utils/validation"

import { httpsCallable } from "../utils/httpsCallable"
import { validatePayload } from "../utils/validation"

import HANDLERS from "./handlers"

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
