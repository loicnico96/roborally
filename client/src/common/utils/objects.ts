export type ObjectRecord<T = unknown> = Record<string, T>

export type Key<T extends ObjectRecord> = keyof T & string
export type Value<T extends ObjectRecord> = T[Key<T>]

export type MappedRecord<T extends ObjectRecord, R> = Record<Key<T>, R>

export function isEmpty(obj: ObjectRecord): boolean {
  return Object.keys(obj).length === 0
}

export function isObjectRecord(data: unknown): data is ObjectRecord {
  return (
    typeof data === "object" &&
    data !== null &&
    Object.getPrototypeOf(data) === Object.prototype
  )
}

export function keys<T extends ObjectRecord>(obj: T): Key<T>[] {
  return Object.keys(obj)
}

export function filter<T extends ObjectRecord>(
  obj: T,
  filterFn: (value: Value<T>, key: Key<T>) => boolean
): Partial<T> {
  return keys(obj).reduce((res, key) => {
    const value = obj[key]
    if (filterFn(value, key)) {
      res[key] = value
    }
    return res
  }, {} as Partial<T>)
}

export function findKey<T extends ObjectRecord>(
  obj: T,
  filterFn: (value: Value<T>, key: Key<T>) => boolean
): Key<T> | undefined {
  return keys(obj).find(key => filterFn(obj[key], key))
}

export function mapValues<T extends ObjectRecord, R>(
  obj: T,
  mapFn: (value: Value<T>, key: Key<T>) => R
): MappedRecord<T, R> {
  return keys(obj).reduce((res, key) => {
    res[key] = mapFn(obj[key], key)
    return res
  }, {} as MappedRecord<T, R>)
}
