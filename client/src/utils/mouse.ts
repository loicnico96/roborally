export type Point = {
  x: number
  y: number
}

export const ORIGIN: Point = Object.freeze({ x: 0, y: 0 })

export function getMousePosition(e: MouseEvent): Point {
  return {
    x: e.pageX,
    y: e.pageY,
  }
}
