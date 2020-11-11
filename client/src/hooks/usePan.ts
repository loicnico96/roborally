import { useCallback, useRef, useState } from "react"
import { clamp } from "common/utils/math"
import { getDimensions, ElementRef } from "utils/dom"
import { getMousePosition, ORIGIN } from "utils/mouse"

export type Offset = {
  x: number
  y: number
}

export type PanOptions = {
  containerRef: ElementRef
  contentRef: ElementRef
  margin?: number
}

export type PanResults = {
  offset: Offset
  setOffset: (offset: Offset) => void
  moveOffset: (delta: Offset) => void
  startPan: (e: React.MouseEvent) => void
  isDragging: boolean
}

function getOffsetBounds(
  containerRef: ElementRef,
  contentRef: ElementRef,
  margin: number
) {
  const containerSize = getDimensions(containerRef)
  const contentSize = getDimensions(contentRef)
  return {
    xMin: Math.min(contentSize.x - containerSize.x + margin, -margin),
    xMax: Math.max(contentSize.x - containerSize.x + margin, -margin),
    yMin: Math.min(contentSize.y - containerSize.y + margin, -margin),
    yMax: Math.max(contentSize.y - containerSize.y + margin, -margin),
  }
}

export function usePan({
  containerRef,
  contentRef,
  margin = 0,
}: PanOptions): PanResults {
  const [isDragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(ORIGIN)

  const lastPointRef = useRef(ORIGIN)

  const moveOffset = useCallback(
    (delta: Offset) => {
      setOffset(state => {
        const bounds = getOffsetBounds(containerRef, contentRef, margin)
        const newX = clamp(state.x + delta.x, bounds.xMin, bounds.xMax)
        const newY = clamp(state.y + delta.y, bounds.yMin, bounds.yMax)
        if (newX === state.x && newY === state.y) {
          return state
        }

        return {
          x: newX,
          y: newY,
        }
      })
    },
    [setOffset, containerRef, contentRef, margin]
  )

  const pan = useCallback(
    (e: MouseEvent) => {
      const lastPoint = lastPointRef.current
      const point = getMousePosition(e)
      lastPointRef.current = point
      moveOffset({
        x: lastPoint.x - point.x,
        y: lastPoint.y - point.y,
      })
    },
    [moveOffset]
  )

  const endPan = useCallback(() => {
    document.removeEventListener("mousemove", pan)
    document.removeEventListener("mouseup", endPan)
    setDragging(false)
  }, [setDragging, pan])

  const startPan = useCallback(
    (e: React.MouseEvent) => {
      document.addEventListener("mousemove", pan)
      document.addEventListener("mouseup", endPan)
      lastPointRef.current = getMousePosition(e.nativeEvent)
      setDragging(true)
    },
    [setDragging, pan, endPan]
  )

  return {
    offset,
    setOffset,
    moveOffset,
    startPan,
    isDragging,
  }
}
