import React, { useCallback, useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import { ReactComponent as SleepIcon } from "assets/icons/Sleep.svg"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { usePrevious } from "hooks/usePrevious"

import GameUiObject from "./GameUiObject"
import { getRobotImage } from "./RobotImage"

const ROBOT_SIZE = 0.6
const TRANSITION_DURATION = 0.5

type GameUiPlayerRobotProps = {
  playerIndex: number
  playerName: string
  player: RoborallyPlayer
}

type PlayerRobotDamageProps = {
  damage: number
}

const PlayerRobotDamageKeyframes = keyframes`
  0% { opacity: 0.0 }
  50% { opacity: 0.7 }
  100% { opacity: 0.0 }
`

function getAnimation({ damage }: PlayerRobotDamageProps) {
  if (damage === 0) {
    return "paused"
  }

  return css`
    ${PlayerRobotDamageKeyframes} ${TRANSITION_DURATION}s forwards
  `
}

function getAnimationColor({ damage }: PlayerRobotDamageProps) {
  return damage > 0 ? "red" : "green"
}

const PlayerRobotDamage = styled.img`
  animation: ${getAnimation};
  background-color: ${getAnimationColor};
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

const PlayerSleepIcon = styled(SleepIcon)`
  height: 60%;
  position: absolute;
  right: -20%;
  top: -20%;
  width: 60%;
`

function getPlayerTooltip(playerName: string, player: RoborallyPlayer): string {
  const qualifiers: string[] = []

  if (player.down) {
    qualifiers.push("powered down")
  }

  if (player.virtual) {
    qualifiers.push("virtual")
  }

  return qualifiers.length > 0
    ? `${playerName} (${qualifiers.join(", ")})`
    : playerName
}

const GameUiPlayerRobot = ({
  player,
  playerIndex,
  playerName,
}: GameUiPlayerRobotProps) => {
  const [damageAnimation, setDamageAnimation] = useState(0)
  const previousPlayer = usePrevious(player)
  const robotUrl = getRobotImage(playerIndex)

  useEffect(() => {
    if (previousPlayer !== undefined && previousPlayer !== player) {
      if (previousPlayer.damage !== player.damage) {
        setDamageAnimation(player.damage - previousPlayer.damage)
      }
    }
  }, [player, previousPlayer, setDamageAnimation])

  const onDamageAnimationEnd = useCallback(() => {
    setDamageAnimation(0)
  }, [setDamageAnimation])

  const playerTooltip = getPlayerTooltip(playerName, player)

  return (
    <GameUiObject
      height={ROBOT_SIZE}
      hidden={player.destroyed}
      opacity={player.virtual ? 0.7 : 1.0}
      rotation={player.rot * 90}
      title={playerTooltip}
      width={ROBOT_SIZE}
      x={player.pos.x + (1 - ROBOT_SIZE) / 2}
      y={player.pos.y + (1 - ROBOT_SIZE) / 2}
    >
      <PlayerRobotImage src={robotUrl} />
      <PlayerRobotDamage
        damage={damageAnimation}
        onAnimationEnd={onDamageAnimationEnd}
      />
      {player.down && <PlayerSleepIcon />}
    </GameUiObject>
  )
}

export default GameUiPlayerRobot
