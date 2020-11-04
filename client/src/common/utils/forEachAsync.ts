export async function forEachAsync<T>(
  array: T[],
  callbackFn: (value: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callbackFn(array[index], index, array)
  }
}
