import { randomValue } from "./arrays"

export type EnumValue = string | number
export type Enum<T extends EnumValue = EnumValue> = Record<string, T>

export function enumValues<T extends EnumValue>(enumType: Enum<T>): T[] {
  return Object.values(enumType)
}

export function isEnum<T extends EnumValue>(
  value: any,
  enumType: Enum<T>
): value is T {
  return enumValues(enumType).includes(value)
}

export function randomEnumValue<T extends EnumValue>(enumType: Enum<T>): T {
  return randomValue(enumValues(enumType))
}
