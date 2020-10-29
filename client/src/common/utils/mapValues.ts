
export function mapValues<T, R, K extends string>(
  obj: Record<K, T>,
  mapFn: (value: T, key: K, obj: Record<K, T>) => R
): Record<K, R> {
  const res = {} as Record<K, R>
  for (const key in obj) {
    res[key] = mapFn(obj[key], key, obj)
  }
  return res
}

export function generate<T, R, K extends string>(
  array: T[],
  mapFn: (value: T, index: number, array: T[]) => [K, R]
): Record<K, R> {
  const res = {} as Record<K, R>
  array.forEach((value, index) => {
    const [key, val] = mapFn(value, index, array)
    res[key] = val
  })
  return res
}

export function removeNulls<T>(array: Array<T | null>): Array<T> {
  return array.filter(value => value != null) as Array<T>
}
