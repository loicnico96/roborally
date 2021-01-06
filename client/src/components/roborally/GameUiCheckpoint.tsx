import React from "react"
import styled from "styled-components"

import { Position } from "common/roborally/model/Position"

import GameUiObject from "./GameUiObject"

const CHECKPOINT_SIZE = 0.8
const CHECKPOINT_BACKGROUND_COLOR = "#090"
const CHECKPOINT_LABEL_COLOR = "#FFF"
const CHEKCPOINT_LABEL_OPACITY = 0.9
const CHECKPOINT_LABEL_SIZE = 60

type GameUiCheckpointProps = {
  index: number
  pos: Position
}

const GameUiCheckpointContainer = styled(GameUiObject)`
  align-items: center;
  background-color: ${CHECKPOINT_BACKGROUND_COLOR};
  border-radius: 50%;
  display: flex;
  justify-content: center;
`

const GameUiCheckpointLabel = styled.div`
  color: ${CHECKPOINT_LABEL_COLOR};
  cursor: default;
  font-size: ${CHECKPOINT_LABEL_SIZE}%;
  opacity: ${CHEKCPOINT_LABEL_OPACITY};
  user-select: none;
`

const GameUiCheckpoint = ({ index, pos }: GameUiCheckpointProps) => (
  <GameUiCheckpointContainer
    height={CHECKPOINT_SIZE}
    title={`Checkpoint ${index}`}
    width={CHECKPOINT_SIZE}
    x={pos.x + (1 - CHECKPOINT_SIZE) / 2}
    y={pos.y + (1 - CHECKPOINT_SIZE) / 2}
  >
    <GameUiCheckpointLabel>{index}</GameUiCheckpointLabel>
  </GameUiCheckpointContainer>
)

export default GameUiCheckpoint
