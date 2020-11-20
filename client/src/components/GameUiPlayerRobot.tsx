import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import styled from "styled-components"

import Robot0 from "../assets/robots/Robot0.png"
import Robot1 from "../assets/robots/Robot1.png"

const CELL_SIZE = 100
const ROBOT_SIZE = 60
const ROBOT_IMAGES = [Robot0, Robot1]
const TRANSITION_DURATION = 0.5

type GameUiPlayerRobotProps = {
  playerIndex: number
  player: RoborallyPlayer
}

function getRobotUrl({ playerIndex }: GameUiPlayerRobotProps): string {
  return ROBOT_IMAGES[playerIndex]
}

function getDisplay({ player }: GameUiPlayerRobotProps): string {
  return player.destroyed ? "none" : "initial"
}

function getTransform({ player }: GameUiPlayerRobotProps): string {
  const translateX = player.pos.x * CELL_SIZE + (CELL_SIZE - ROBOT_SIZE) / 2
  const translateY = player.pos.y * CELL_SIZE + (CELL_SIZE - ROBOT_SIZE) / 2
  const rotateDeg = player.rot * 90
  return `translate(${translateX}px, ${translateY}px) rotate(${rotateDeg}deg)`
}

const GameUiPlayerRobot = styled.div`
  background-image: url(${getRobotUrl});
  background-repeat: no-repeat;
  background-size: ${ROBOT_SIZE}px;
  display: ${getDisplay};
  height: ${ROBOT_SIZE}px;
  position: absolute;
  transform: ${getTransform};
  transition: transform ${TRANSITION_DURATION}s;
  width: ${ROBOT_SIZE}px;
`

export default GameUiPlayerRobot
