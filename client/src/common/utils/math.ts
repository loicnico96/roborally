export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}
