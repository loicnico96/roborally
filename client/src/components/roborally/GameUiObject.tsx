import React from "react"

import { toViewportCoord, toViewportSize } from "./Viewport"
import ViewportObject from "./ViewportObject"

export type GameUiObjectProps = React.PropsWithChildren<{
  className?: string
  height: number
  rot?: number
  title?: string
  width: number
  x: number
  y: number
}>

const GameUiObject = ({
  children,
  className,
  height,
  rot = 0,
  title,
  width,
  x,
  y,
}: GameUiObjectProps) => (
  <ViewportObject
    className={className}
    height={toViewportSize(height)}
    rot={rot * 90}
    title={title}
    width={toViewportSize(width)}
    x={toViewportCoord(x)}
    y={toViewportCoord(y)}
  >
    {children}
  </ViewportObject>
)

export default GameUiObject
