import React from "react"
import styled from "styled-components"

import { useViewport } from "./GameUiViewport"

const TRANSITION_DURATION = 0.5

export type ViewportObjectProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  height: number
  hidden?: boolean
  opacity?: number
  rotation?: number
  width: number
  x: number
  y: number
}

type ObjectProps = ViewportObjectProps & {
  viewportHeight: number
  viewportWidth: number
}

function getHidden({ hidden = false }: ObjectProps): string {
  return hidden ? "display: none;" : ""
}

function getOpacity({ opacity = 1.0 }: ObjectProps): number {
  return opacity
}

function getHeight({ height, viewportHeight }: ObjectProps): string {
  return `calc(100% * ${height} / ${viewportHeight})`
}

function getTransform({ height, rotation, width, x, y }: ObjectProps): string {
  const translateX = `calc(100% * ${x} / ${width})`
  const translateY = `calc(100% * ${y} / ${height})`
  const transform = `translate(${translateX}, ${translateY})`
  if (rotation !== undefined) {
    return `${transform} rotate(${rotation}deg)`
  }

  return transform
}

function getWidth({ width, viewportWidth }: ObjectProps): string {
  return `calc(100% * ${width} / ${viewportWidth})`
}

const ObjectContainer = styled.div`
  ${getHidden}
  height: ${getHeight};
  opacity: ${getOpacity};
  position: absolute;
  transform: ${getTransform};
  transition: transform ${TRANSITION_DURATION}s;
  width: ${getWidth};
`

const ViewportObject = (props: ViewportObjectProps) => {
  const { viewportHeight, viewportWidth } = useViewport()

  return (
    <ObjectContainer
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
      {...props}
    />
  )
}

export default ViewportObject
