export type ElementRef = React.RefObject<HTMLElement | null>

export type Dimensions = {
  x: number
  y: number
}

export function getDimensions(ref: ElementRef): Dimensions {
  return {
    x: ref.current?.offsetWidth ?? 0,
    y: ref.current?.offsetHeight ?? 0,
  }
}