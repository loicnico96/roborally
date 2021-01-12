export type Constructor<T, P extends any[]> = new (...args: P) => T

export function constructorOf<T, P extends any[]>(
  classObj: Constructor<T, P>
): (...args: P) => T {
  return (...args: P) => new classObj(...args)
}
