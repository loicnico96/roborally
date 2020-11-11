export type ReadonlyArray<T> = readonly T[]

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

export function clone<T>(array: ReadonlyArray<T>): Array<T> {
  return [...array]
}

export function inlineShuffle<T>(array: Array<T>): void {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
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

export function sortBy<T>(
  array: ReadonlyArray<T>,
  sortFn: (value: T) => number,
  sortDirection: SortDirection = SortDirection.ASC
): Array<T> {
  const result = clone(array)
  inlineSortBy(result, sortFn, sortDirection)
  return result
}

export function unique<T>(array: ReadonlyArray<T>): Array<T> {
  return Array.from(new Set(array))
}
