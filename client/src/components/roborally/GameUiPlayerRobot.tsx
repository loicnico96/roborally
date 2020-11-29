import React, { useCallback, useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

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

const PlayerRobotContainer = styled.div`
  display: ${getDisplay};
  height: ${ROBOT_SIZE}px;
  position: absolute;
  opacity: ${getOpacity};
  transform: ${getTransform};
  transition: transform ${TRANSITION_DURATION}s;
  width: ${ROBOT_SIZE}px;
`

const PlayerRobotDamageAnimation = keyframes`
  0% { opacity: 0.0 }
  50% { opacity: 0.7 }
  100% { opacity: 0.0 }
`

const PlayerRobotDamage = styled.img`
  animation: ${({ damage }: { damage: number }) =>
    damage > 0
      ? css`
          ${PlayerRobotDamageAnimation} ${TRANSITION_DURATION}s forwards
        `
      : "paused"};
  background-color: red;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const PlayerRobotImage = styled.img`
  height: 100%;
  width: 100%;
`

const GameUiPlayerRobot = (props: GameUiPlayerRobotProps) => {
  const [damageAnimation, setDamageAnimation] = useState(0)

  const { player } = props
  const lastPlayerRef = useRef(player)
  const robotUrl = getRobotUrl(props)

  useEffect(() => {
    if (player.damage > lastPlayerRef.current.damage) {
      setDamageAnimation(player.damage - lastPlayerRef.current.damage)
    }
    lastPlayerRef.current = player
  }, [lastPlayerRef, player, setDamageAnimation])

  const onDamageAnimationEnd = useCallback(() => {
    setDamageAnimation(0)
  }, [setDamageAnimation])

  return (
    <PlayerRobotContainer {...props}>
      <PlayerRobotImage src={robotUrl} />
      <PlayerRobotDamage
        damage={damageAnimation}
        onAnimationEnd={onDamageAnimationEnd}
      />
    </PlayerRobotContainer>
  )
}

export default GameUiPlayerRobot
