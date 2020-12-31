import { ObjectRecord } from "common/utils/objects"
import { Validators, validateObject } from "common/utils/validation"

import { validationError } from "./errors"

export function validatePayload<T extends ObjectRecord>(
  payload: unknown,
  validators: Validators<T>
): T {
  try {
    const validator = validateObject(validators)
    return validator(payload)
  } catch (error) {
    throw validationError(error.message)
  }
}
