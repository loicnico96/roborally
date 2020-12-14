import React, { useCallback, useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"

import GameUiObject, { GameUiObjectProps } from "./GameUiObject"
import { getRobotImage } from "./RobotImage"

const ROBOT_SIZE = 0.6
const TRANSITION_DURATION = 0.5

type GameUiPlayerRobotProps = {
  playerIndex: number
  player: RoborallyPlayer
}

type PlayerRobotContainerProps = GameUiObjectProps & {
  isDestroyed: boolean
  isVirtual: boolean
}

function getDisplay({ isDestroyed }: PlayerRobotContainerProps): string {
  return isDestroyed ? "none" : "initial"
}

function getOpacity({ isVirtual }: PlayerRobotContainerProps): number {
  return isVirtual ? 0.7 : 1.0
}

const PlayerRobotContainer = styled(GameUiObject)`
  display: ${getDisplay};
  opacity: ${getOpacity};
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
  vertical-align: top;
  width: 100%;
`

const GameUiPlayerRobot = ({ player, playerIndex }: GameUiPlayerRobotProps) => {
  const [damageAnimation, setDamageAnimation] = useState(0)
  const lastPlayerRef = useRef(player)
  const robotUrl = getRobotImage(playerIndex)

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
    <PlayerRobotContainer
      height={ROBOT_SIZE}
      isDestroyed={player.destroyed}
      isVirtual={player.virtual}
      rot={player.rot}
      width={ROBOT_SIZE}
      x={player.pos.x + (1 - ROBOT_SIZE) / 2}
      y={player.pos.y + (1 - ROBOT_SIZE) / 2}
    >
      <PlayerRobotImage src={robotUrl} />
      <PlayerRobotDamage
        damage={damageAnimation}
        onAnimationEnd={onDamageAnimationEnd}
      />
    </PlayerRobotContainer>
  )
}

export default GameUiPlayerRobot
