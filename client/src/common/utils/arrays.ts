import { randomInt } from "./math"

export type ReadonlyArray<T> = readonly T[]

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export function clone<T>(array: ReadonlyArray<T>): Array<T> {
  return [...array]
}

export function generate<T extends string | number, R>(
  array: ReadonlyArray<T>,
  mapFn: (key: T) => R
): Record<T, R> {
  return array.reduce((result, key) => {
    result[key] = mapFn(key)
    return result
  }, {} as Record<T, R>)
}

export function randomValue<T>(array: ReadonlyArray<T>): T {
  return array[randomInt(array.length)]
}

export function inlineShuffle<T>(array: Array<T>): void {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = randomInt(index + 1)
    const swapValue = array[index]
    array[index] = array[randomIndex]
    array[randomIndex] = swapValue
  }
}

export function shuffle<T>(array: ReadonlyArray<T>): Array<T> {
  const result = clone(array)
  inlineShuffle(result)
  return result
}

export function inlineSortBy<T>(
  array: Array<T>,
  sortFn: (value: T) => number,
  sortDirection: SortDirection = SortDirection.ASC
): void {
  array.sort((a, b) => (sortFn(a) - sortFn(b)) * sortDirection)
}

export function inlineSortByAlpha<T>(
  array: Array<T>,
  sortFn: (value: T) => string,
  sortDirection: SortDirection = SortDirection.ASC
): void {
  array.sort((a, b) => sortFn(a).localeCompare(sortFn(b)) * sortDirection)
}

export function sortBy<T>(
  array: ReadonlyArray<T>,
  sortFn: (value: T) => number,
  sortDirection: SortDirection = SortDirection.ASC
): Array<T> {
  const result = clone(array)
  inlineSortBy(result, sortFn, sortDirection)
  return result
}

export function sortByAlpha<T>(
  array: ReadonlyArray<T>,
  sortFn: (value: T) => string,
  sortDirection: SortDirection = SortDirection.ASC
): Array<T> {
  const result = clone(array)
  inlineSortByAlpha(result, sortFn, sortDirection)
  return result
}

export function unique<T>(array: ReadonlyArray<T>): Array<T> {
  return Array.from(new Set(array))
}
