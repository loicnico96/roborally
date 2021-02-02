export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

export function randomInt(count: number): number {
  return Math.floor(Math.random() * count)
}

export function range(start: number, end: number): number[] {
  if (end < start) {
    throw Error("Range error: 'end' should not be less than 'start'")
  }

  return Array(end - start)
    .fill(start)
    .map((_, index) => start + index)
}

export function repeat(times: number, fn: (index: number) => void): void {
  for (let index = 0; index < times; index++) {
    fn(index)
  }
}
