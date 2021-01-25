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

type GameUiViewportProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  maxZoom?: number
  minZoom?: number
  viewportHeight: number
  viewportWidth: number
  zoomRate?: number
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

function getRatio(zoom: number, zoomRate: number) {
  return Math.pow(zoomRate, zoom)
}

const GameUiViewport = ({
  children,
  maxZoom = 8,
  minZoom = -16,
  viewportHeight,
  viewportWidth,
  zoomRate = 1.1,
  ...props
}: GameUiViewportProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { isDragging, moveOffset, offset, startPan } = usePan({
    containerRef,
    contentRef,
  })

  const [mousePos, setMousePos] = useState<Offset>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(0)

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const elementRect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.pageX - elementRect.left,
      y: e.pageY - elementRect.top,
    })
  }, [])

  const ratio = getRatio(zoom, zoomRate)
  const viewportMousePos = useMemo(
    () => ({
      x: (mousePos.x + offset.x) / ratio,
      y: (mousePos.y + offset.y) / ratio,
    }),
    [mousePos, offset, ratio]
  )

  const changeZoom = useCallback(
    (newZoom: number) => {
      if (newZoom !== zoom) {
        const oldRatio = getRatio(zoom, zoomRate)
        const newRatio = getRatio(newZoom, zoomRate)
        setZoom(newZoom)
        moveOffset({
          x: viewportMousePos.x * (newRatio - oldRatio),
          y: viewportMousePos.y * (newRatio - oldRatio),
        })
      }
    },
    [moveOffset, viewportMousePos, zoom, zoomRate]
  )

  const onMouseWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY > 0) {
        changeZoom(Math.max(zoom - 1, minZoom))
      } else if (e.deltaY < 0) {
        changeZoom(Math.min(zoom + 1, maxZoom))
      }
    },
    [changeZoom, minZoom, maxZoom, zoom]
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
      isDragging={isDragging}
      onMouseDown={startPan}
      onMouseMove={onMouseMove}
      onWheel={onMouseWheel}
      ref={containerRef}
      {...props}
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
