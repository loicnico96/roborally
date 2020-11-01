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
