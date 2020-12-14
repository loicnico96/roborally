import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

import { usePan, Offset } from "hooks/usePan"
import { styledDivWithProps } from "utils/styles"

const MIN_ZOOM = -16
const MAX_ZOOM = 8
const ZOOM_RATE = 1.1

type GameUiViewportProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  viewportHeight: number
  viewportWidth: number
}

type ViewportInfo = {
  mousePos: Offset
  viewportHeight: number
  viewportWidth: number
}

const ViewportContext = createContext<ViewportInfo>({
  mousePos: { x: 0, y: 0 },
  viewportHeight: 0,
  viewportWidth: 0,
})

export function useViewport(): ViewportInfo {
  return useContext(ViewportContext)
}

const GameUiViewportContainer = styledDivWithProps<{
  isDragging: boolean
}>()`
  background-color: black;
  cursor: ${props => (props.isDragging ? "move" : "auto")};
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`

const GameUiViewportContent = styledDivWithProps<{
  offset: Offset
  ratio: number
  viewportHeight: number
  viewportWidth: number
}>()`
  font-size: calc(100px * ${props => props.ratio});
  height: calc(${props => props.viewportHeight}px * ${props => props.ratio});
  left: ${props => -props.offset.x}px;
  position: absolute;
  top: ${props => -props.offset.y}px;
  width: calc(${props => props.viewportWidth}px * ${props => props.ratio});
`

const GameUiViewport = ({
  children,
  className,
  viewportHeight,
  viewportWidth,
}: GameUiViewportProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { isDragging, moveOffset, offset, startPan } = usePan({
    containerRef,
    contentRef,
  })

  const [mousePos, setMousePos] = useState<Offset>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(0)

  const ratio = Math.pow(ZOOM_RATE, zoom)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const elementRect = e.currentTarget.getBoundingClientRect()
      setMousePos({
        x: e.pageX - elementRect.left,
        y: e.pageY - elementRect.top,
      })
    },
    [setMousePos]
  )

  const viewportMousePos = useMemo(
    () => ({
      x: (mousePos.x + offset.x) / ratio,
      y: (mousePos.y + offset.y) / ratio,
    }),
    [mousePos, offset, ratio]
  )

  const changeZoom = useCallback(
    (newZoom: number, oldZoom: number) => {
      if (newZoom !== oldZoom) {
        const oldRatio = Math.pow(ZOOM_RATE, oldZoom)
        const newRatio = Math.pow(ZOOM_RATE, newZoom)
        setZoom(newZoom)
        moveOffset({
          x: viewportMousePos.x * (newRatio - oldRatio),
          y: viewportMousePos.y * (newRatio - oldRatio),
        })
      }
    },
    [moveOffset, setZoom, viewportMousePos]
  )

  const onMouseWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY > 0) {
        changeZoom(Math.max(zoom - 1, MIN_ZOOM), zoom)
      } else if (e.deltaY < 0) {
        changeZoom(Math.min(zoom + 1, MAX_ZOOM), zoom)
      }
    },
    [changeZoom, zoom]
  )

  const viewportInfo = useMemo(
    () => ({
      mousePos: viewportMousePos,
      viewportHeight,
      viewportWidth,
    }),
    [viewportMousePos, viewportHeight, viewportWidth]
  )

  return (
    <GameUiViewportContainer
      className={className}
      isDragging={isDragging}
      onMouseDown={startPan}
      onMouseMove={onMouseMove}
      onWheel={onMouseWheel}
      ref={containerRef}
    >
      <GameUiViewportContent
        offset={offset}
        ratio={ratio}
        ref={contentRef}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
      >
        <ViewportContext.Provider value={viewportInfo}>
          {children}
        </ViewportContext.Provider>
      </GameUiViewportContent>
    </GameUiViewportContainer>
  )
}

export default GameUiViewport
