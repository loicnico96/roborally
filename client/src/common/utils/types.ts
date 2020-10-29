
export type Keys<T extends object> = keyof T
export type Values<T extends object> = T[keyof T]

export type If<A extends boolean, IfTrue, IfFalse> = A extends true ? IfTrue : IfFalse

export type Not<A extends boolean> = If<A, false, true>
export type And<A extends boolean, B extends boolean> = If<A, B, false>
export type Or<A extends boolean, B extends boolean> = If<A, true, B>

export type Extends<A, B> = A extends B ? true : false
export type Equals<A, B> = And<Extends<A, B>, Extends<B, A>>
export type IsNever<A> = Extends<[A], [never]>

export type Enum<T extends string | number> = Record<string, If<Extends<T, string>, T, T | string>>

export function isEnum<T extends string | number>(value: any, enumType: Enum<T>): value is T {
  return Object.values(enumType).indexOf(value) < 0
}
