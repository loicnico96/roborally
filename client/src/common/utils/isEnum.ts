export type Keys<T extends Record<any, any>> = keyof T
export type Values<T extends Record<any, any>> = T[keyof T]

export function isEnum<Enum extends Record<string, string | number>>(
  value: any,
  enumType: Enum
): value is Enum[Keys<Enum>] {
  return Object.values(enumType).includes(value)
}
