import { isEnum } from "./enums"
import { isObjectRecord, keys, mapValues, Key, ObjectRecord } from "./objects"

export type Validator<T> = (data: unknown) => T
export type SchemaValidator<T> = (data: ObjectRecord, key: string) => T
export type SchemaValidators<T extends ObjectRecord> = {
  [K in Key<T>]: SchemaValidator<T[K]>
}

export function optional<T>(
  validator: Validator<T>
): SchemaValidator<T | undefined> {
  return (data: ObjectRecord, key: string) => {
    if (key in data) {
      try {
        return validator(data[key])
      } catch (error) {
        throw Error(`Invalid field "${key}" - ${error.message}`)
      }
    } else {
      return undefined
    }
  }
}

export function required<T>(validator: Validator<T>): SchemaValidator<T> {
  return (data: ObjectRecord, key: string) => {
    if (key in data) {
      try {
        return validator(data[key])
      } catch (error) {
        throw Error(`Invalid field "${key}" - ${error.message}`)
      }
    } else {
      throw Error(`Missing field "${key}"`)
    }
  }
}

export function validateArray<T>(
  elementValidator: Validator<T>,
  options?: {
    minSize?: number
    maxSize?: number
  }
): Validator<T[]> {
  return (data: unknown) => {
    if (!Array.isArray(data)) {
      throw Error("Not an array")
    }

    if (options) {
      const { minSize, maxSize } = options
      if (minSize !== undefined && data.length < minSize) {
        throw Error("Array is too short")
      }

      if (maxSize !== undefined && data.length > maxSize) {
        throw Error("Array is too long")
      }
    }

    return data.map((value, index) => {
      try {
        return elementValidator(value)
      } catch (error) {
        throw Error(`Invalid element [${index}] - ${error.message}`)
      }
    })
  }
}

export function validateBoolean(): Validator<boolean> {
  return (data: unknown) => {
    if (typeof data !== "boolean") {
      throw Error("Not a boolean")
    }

    return data
  }
}

export function validateEnum<T extends Record<string, string | number>>(
  enumType: T
): Validator<T[keyof T]> {
  return (data: unknown) => {
    if (!isEnum(data, enumType)) {
      throw Error("Not an enum")
    }

    return data
  }
}

export function validateNumber(options?: {
  integer?: boolean
  min?: number
  max?: number
}): Validator<number> {
  return (data: unknown) => {
    if (typeof data !== "number" || !Number.isFinite(data)) {
      throw Error("Not a number")
    }

    if (options) {
      const { min, max, integer } = options
      if (integer === true && !Number.isInteger(data)) {
        throw Error("Not an integer")
      }

      if (min !== undefined && data < min) {
        throw Error("Number is too small")
      }

      if (max !== undefined && data > max) {
        throw Error("Number is too big")
      }
    }

    return data
  }
}

export function validateObject<T extends ObjectRecord>(
  schemaValidators: SchemaValidators<T>
): Validator<T> {
  return (data: unknown) => {
    if (!isObjectRecord(data)) {
      throw Error("Not an object")
    }

    return keys(schemaValidators).reduce((result, key) => {
      result[key] = schemaValidators[key](data, key)
      return result
    }, {} as T)
  }
}

export function validateRecord<T>(
  elementValidator: Validator<T>
): Validator<ObjectRecord<T>> {
  return (data: unknown) => {
    if (!isObjectRecord(data)) {
      throw Error("Not an object")
    }

    return mapValues(data, (value, key) => {
      try {
        return elementValidator(value)
      } catch (error) {
        throw Error(`Invalid field "${key}" - ${error.message}`)
      }
    })
  }
}

export function validateString(options?: {
  minSize?: number
  maxSize?: number
  regex?: RegExp
}): Validator<string> {
  return (data: unknown) => {
    if (typeof data !== "string") {
      throw Error("Not a string")
    }

    if (options) {
      const { minSize, maxSize, regex } = options
      if (minSize !== undefined && data.length < minSize) {
        throw Error("String is too short")
      }

      if (maxSize !== undefined && data.length > maxSize) {
        throw Error("String is too long")
      }

      if (regex !== undefined && !data.match(regex)) {
        throw Error("Invalid string format")
      }
    }

    return data
  }
}

export function validateTuple<T extends any[]>(
  ...validators: { [K in keyof T]: Validator<T[K]> }
): Validator<T> {
  return (data: unknown) => {
    if (!Array.isArray(data)) {
      throw Error("Not a tuple")
    }

    if (data.length < validators.length) {
      throw Error("Tuple is too short")
    }

    if (data.length > validators.length) {
      throw Error("Tuple is too long")
    }

    return data.map((value, index) => {
      try {
        return validators[index](value)
      } catch (error) {
        throw Error(`Invalid element [${index}] - ${error.message}`)
      }
    }) as T
  }
}

export function validateUnknown(): Validator<unknown> {
  return (data: unknown) => data
}
