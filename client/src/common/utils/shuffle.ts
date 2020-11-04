export function shuffle<T>(array: T[]) {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const swapValue = array[index]
    array[index] = array[randomIndex]
    array[randomIndex] = swapValue
  }
}
