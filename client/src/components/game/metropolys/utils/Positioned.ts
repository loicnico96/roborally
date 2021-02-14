import { Stylable, styledWithProps } from "utils/styles"

export type PositionedProps = {
  x: number
  y: number
}

export function Positioned<C extends Stylable>(Component: C) {
  return styledWithProps<C, PositionedProps>(Component)`
    left: ${props => props.x}%;
    position: absolute;
    top: ${props => props.y}%;
    transform: translate(-50%, -50%);
  `
}
