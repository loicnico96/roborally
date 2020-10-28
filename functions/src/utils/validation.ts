import { validationError } from "./error"

export type ObjectRecord<T = any> = Record<string, T>

export type Validator<T> = (value: unknown) => T
export type SchemaValidator<T> = (data: ObjectRecord, key: string) => T
export type SchemaValidators<T extends ObjectRecord> = {
  [K in keyof T]: SchemaValidator<T[K]>
}

export function required<T>(
  validator: Validator<T>
): SchemaValidator<T> {
  return (data: ObjectRecord, key: string) => {
    if (key in data) {
      try {
        return validator(data[key])
      } catch (error) {
        throw validationError(`Invalid field '${key}' - ${error.message}`)
      }
    } else {
      throw validationError(`Missing field '${key}'`)
    }
  }
}

export function optional<T>(
  validator: Validator<T>
): SchemaValidator<T | undefined> {
  return (data: ObjectRecord, key: string) => {
    if (key in data) {
      try {
        return validator(data[key])
      } catch (error) {
        throw validationError(`Invalid field '${key}' - ${error.message}`)
      }
    } else {
      return undefined
    }
  }
}

export function validate<T extends ObjectRecord>(
  data: unknown,
  validators: SchemaValidators<T>
): T {
  if (typeof data !== "object" || data === null) {
    throw validationError("Invalid data format - Not an object")
  }

  const result = {} as T
  for (const key in validators) {
    result[key] = validators[key](data, key)
  }

  return result
}
