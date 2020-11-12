export type ObjectRecord<T = unknown> = Record<string, T>

export type Key<T extends ObjectRecord> = keyof T & string
export type Value<T extends ObjectRecord> = T[Key<T>]

export type MapRecord<T extends ObjectRecord, R> = Record<Key<T>, R>
export type Pick<T extends ObjectRecord, K extends keyof T> = {
  [key in K]: T[K]
}

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
): T {
  return keys(obj).reduce((res, key) => {
    const value = obj[key]
    if (filterFn(value, key)) {
      res[key] = value
    }
    return res
  }, {} as T)
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
): MapRecord<T, R> {
  return keys(obj).reduce((res, key) => {
    res[key] = mapFn(obj[key], key)
    return res
  }, {} as MapRecord<T, R>)
}

export function merge<T1 extends ObjectRecord, T2 extends ObjectRecord>(
  obj: T1,
  src: T2
): T1 & T2 {
  return { ...obj, ...src }
}

export function pick<T extends ObjectRecord, K extends keyof T>(
  obj: T,
  pickKeys: K[]
): Pick<T, K> {
  return pickKeys.reduce((res, key) => {
    if (key in obj) {
      res[key] = obj[key]
    }
    return res
  }, {} as Pick<T, K>)
}

export function size(obj: ObjectRecord): number {
  return Object.keys(obj).length
}
