import React from "react"

import { toViewportCoord, toViewportSize } from "./Viewport"
import ViewportObject, { ViewportObjectProps } from "./ViewportObject"

const GameUiObject = ({
  children,
  height,
  width,
  x,
  y,
  ...props
}: ViewportObjectProps) => (
  <ViewportObject
    height={toViewportSize(height)}
    width={toViewportSize(width)}
    x={toViewportCoord(x)}
    y={toViewportCoord(y)}
    {...props}
  >
    {children}
  </ViewportObject>
)

export default GameUiObject
