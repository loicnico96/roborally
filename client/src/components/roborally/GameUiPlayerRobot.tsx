import styled from "styled-components"

import Robot0 from "assets/robots/Robot0.png"
import Robot1 from "assets/robots/Robot1.png"
import Robot2 from "assets/robots/Robot2.png"
import Robot3 from "assets/robots/Robot3.png"
import Robot4 from "assets/robots/Robot4.png"
import Robot5 from "assets/robots/Robot5.png"
import Robot6 from "assets/robots/Robot6.png"
import Robot7 from "assets/robots/Robot7.png"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"

const CELL_SIZE = 100
const ROBOT_SIZE = 60
const ROBOT_IMAGES = [
  Robot0,
  Robot1,
  Robot2,
  Robot3,
  Robot4,
  Robot5,
  Robot6,
  Robot7,
]
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
