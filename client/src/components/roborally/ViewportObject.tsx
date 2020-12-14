import React from "react"
import styled from "styled-components"

import { useViewport } from "./GameUiViewport"

const TRANSITION_DURATION = 0.5

export type ViewportObjectProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  height: number
  rot?: number
  width: number
  x: number
  y: number
}

type ViewportObjectContainerProps = ViewportObjectProps & {
  viewportHeight: number
  viewportWidth: number
}

function getHeight({
  height,
  viewportHeight,
}: ViewportObjectContainerProps): string {
  return `calc(100% * ${height} / ${viewportHeight})`
}

function getTransform({
  height,
  rot,
  width,
  x,
  y,
}: ViewportObjectContainerProps): string {
  const translateX = `calc(100% * ${x} / ${width})`
  const translateY = `calc(100% * ${y} / ${height})`
  const transform = `translate(${translateX}, ${translateY})`
  if (rot !== undefined) {
    return `${transform} rotate(${rot}deg)`
  }

  return transform
}

function getWidth({
  width,
  viewportWidth,
}: ViewportObjectContainerProps): string {
  return `calc(100% * ${width} / ${viewportWidth})`
}

const ViewportObjectContainer = styled.div`
  height: ${getHeight};
  position: absolute;
  transform: ${getTransform};
  transition: transform ${TRANSITION_DURATION}s;
  width: ${getWidth};
`

const ViewportObject = (props: ViewportObjectProps) => {
  const { viewportHeight, viewportWidth } = useViewport()

  return (
    <ViewportObjectContainer
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
      {...props}
    />
  )
}

export default ViewportObject
