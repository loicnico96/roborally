import React from "react"
import { Position } from "common/roborally/model/Position"
import styled from "styled-components"

const CELL_SIZE = 100
const CHECKPOINT_SIZE = 80
const CHECKPOINT_BACKGROUND_COLOR = "#090"
const CHECKPOINT_LABEL_COLOR = "#FFF"
const CHEKCPOINT_LABEL_OPACITY = 0.9
const CHECKPOINT_LABEL_SIZE = 60

type GameUiCheckpointProps = {
  index: number
  pos: Position
}

function getTransform({ pos }: GameUiCheckpointProps): string {
  const translateX = pos.x * CELL_SIZE + (CELL_SIZE - CHECKPOINT_SIZE) / 2
  const translateY = pos.y * CELL_SIZE + (CELL_SIZE - CHECKPOINT_SIZE) / 2
  return `translate(${translateX}px, ${translateY}px)`
}

const GameUiCheckpointContainer = styled.div`
  align-items: center;
  background-color: ${CHECKPOINT_BACKGROUND_COLOR};
  background-repeat: no-repeat;
  background-size: ${CHECKPOINT_SIZE}px;
  border-radius: ${CHECKPOINT_SIZE / 2}px;
  display: flex;
  height: ${CHECKPOINT_SIZE}px;
  justify-content: center;
  position: absolute;
  transform: ${getTransform};
  width: ${CHECKPOINT_SIZE}px;
`

const GameUiCheckpointLabel = styled.div`
  color: ${CHECKPOINT_LABEL_COLOR};
  font-size: ${CHECKPOINT_LABEL_SIZE}px;
  opacity: ${CHEKCPOINT_LABEL_OPACITY};
`

const GameUiCheckpoint = (props: GameUiCheckpointProps) => (
  <GameUiCheckpointContainer {...props}>
    <GameUiCheckpointLabel>{props.index}</GameUiCheckpointLabel>
  </GameUiCheckpointContainer>
)

export default GameUiCheckpoint
