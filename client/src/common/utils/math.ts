export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

export function randomInt(range: number): number {
  return Math.floor(Math.random() * range)
}
