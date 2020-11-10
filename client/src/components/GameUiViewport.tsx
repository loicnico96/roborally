import React, { useRef } from "react"
import styled from "styled-components"
import { usePan, Offset } from "hooks/usePan"

type GameUiViewportProps = React.PropsWithChildren<{
  // TODO
}>

type GameUiViewportContainerProps = {
  isDragging: boolean
}

type GameUiViewportContentProps = {
  offset: Offset
}

function getCursor({ isDragging }: GameUiViewportContainerProps): string {
  return isDragging ? "move" : "auto"
}

function getOffsetX({ offset }: GameUiViewportContentProps): number {
  return -offset.x
}

function getOffsetY({ offset }: GameUiViewportContentProps): number {
  return -offset.y
}

const GameUiViewportContainer = styled.div`
  background-color: black;
  cursor: ${getCursor};
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`

const GameUiViewportContent = styled.div`
  left: ${getOffsetX}px;
  position: absolute;
  top: ${getOffsetY}px;
`

const GameUiViewport = ({ children }: GameUiViewportProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { offset, startPan, isDragging } = usePan({
    containerRef,
    contentRef,
  })

  return (
    <GameUiViewportContainer
      isDragging={isDragging}
      onMouseDown={startPan}
      ref={containerRef}
    >
      <GameUiViewportContent offset={offset} ref={contentRef}>
        {children}
      </GameUiViewportContent>
    </GameUiViewportContainer>
  )
}

export default GameUiViewport
