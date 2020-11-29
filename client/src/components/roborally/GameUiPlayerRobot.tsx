import React from "react"
import styled from "styled-components"

import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"

import { getRobotImage } from "./RobotImage"

const CELL_SIZE = 100
const ROBOT_SIZE = 60
const TRANSITION_DURATION = 0.5

type GameUiPlayerRobotProps = {
  playerIndex: number
  player: RoborallyPlayer
}

function getRobotUrl({ playerIndex }: GameUiPlayerRobotProps): string {
  return getRobotImage(playerIndex)
}

function getDisplay({ player }: GameUiPlayerRobotProps): string {
  return player.destroyed ? "none" : "initial"
}

function getOpacity({ player }: GameUiPlayerRobotProps): number {
  return player.virtual ? 0.7 : 1.0
}

function getTransform({ player }: GameUiPlayerRobotProps): string {
  const translateX = player.pos.x * CELL_SIZE + (CELL_SIZE - ROBOT_SIZE) / 2
  const translateY = player.pos.y * CELL_SIZE + (CELL_SIZE - ROBOT_SIZE) / 2
  const rotateDeg = player.rot * 90
  return `translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg)`
}

const GameUiPlayerRobotImage = styled.img`
  display: ${getDisplay};
  height: ${ROBOT_SIZE}px;
  position: absolute;
  opacity: ${getOpacity};
  transform: ${getTransform};
  transition: transform ${TRANSITION_DURATION}s;
  width: ${ROBOT_SIZE}px;
`

const GameUiPlayerRobot = (props: GameUiPlayerRobotProps) => {
  const robotUrl = getRobotUrl(props)
  return <GameUiPlayerRobotImage src={robotUrl} {...props} />
}

export default GameUiPlayerRobot
