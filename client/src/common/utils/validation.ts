import { Enum, EnumValue, isEnum } from "./enums"
import { isObjectRecord, keys, mapValues, ObjectRecord } from "./objects"

export type Validator<T> = (data: unknown) => T
export type Validators<T extends ObjectRecord> = {
  [K in keyof T]: Validator<T[K]>
}

export function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return data => (data === undefined ? data : validator(data))
}

export function validateAny(): Validator<unknown> {
  return data => data
}

export function validateArray<T>(
  validator: Validator<T>,
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
        return validator(value)
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

export function validateEnum<T extends EnumValue>(
  enumType: Enum<T>
): Validator<T> {
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
  validators: Validators<T>
): Validator<T> {
  return (data: unknown) => {
    if (!isObjectRecord(data)) {
      throw Error("Not an object")
    }

    return keys(validators).reduce((result, key) => {
      try {
        result[key] = validators[key](data[key])
        return result
      } catch (error) {
        if (data[key] === undefined) {
          throw Error(`Missing field "${key}"`)
        } else {
          throw Error(`Invalid field "${key}" - ${error.message}`)
        }
      }
    }, {} as T)
  }
}

export function validateOneOf<T extends boolean | null | number | string>(
  values: T[]
): Validator<T> {
  return (data: unknown) => {
    if (!values.includes(data as T)) {
      throw Error("Not an enum")
    }

    return data as T
  }
}

export function validateRecord(): Validator<ObjectRecord>
export function validateRecord<T>(
  validator: Validator<T>
): Validator<ObjectRecord<T>>
export function validateRecord<T = unknown>(
  validator?: Validator<T>
): Validator<ObjectRecord<T>> {
  return (data: unknown) => {
    if (!isObjectRecord(data)) {
      throw Error("Not an object")
    }

    return mapValues(data, (value, key) => {
      try {
        return validator ? validator(value) : value
      } catch (error) {
        throw Error(`Invalid field "${key}" - ${error.message}`)
      }
    }) as ObjectRecord<T>
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
