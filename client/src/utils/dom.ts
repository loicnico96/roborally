export type ElementRef = React.RefObject<HTMLElement | null>

export type Dimensions = {
  x: number
  y: number
}

export type SelectEvent = React.ChangeEvent<HTMLSelectElement>

export function getDimensions(ref: ElementRef): Dimensions {
  return {
    x: ref.current?.offsetWidth ?? 0,
    y: ref.current?.offsetHeight ?? 0,
  }
}

export async function pause(millis: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, millis)
  })
}
