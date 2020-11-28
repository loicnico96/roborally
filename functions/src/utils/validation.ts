import { ObjectRecord } from "common/utils/objects"
import { SchemaValidators, validateObject } from "common/utils/validation"
import { validationError } from "./errors"

export function validatePayload<T extends ObjectRecord>(
  payload: unknown,
  validators: SchemaValidators<T>
): T {
  try {
    const validator = validateObject(validators)
    return validator(payload)
  } catch (error) {
    throw validationError(error.message)
  }
}
