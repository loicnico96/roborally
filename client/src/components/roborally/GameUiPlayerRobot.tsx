import React from "react"
import styled from "styled-components"

import { ReactComponent as SleepIcon } from "assets/icons/Sleep.svg"
import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { usePlayerName } from "hooks/usePlayerName"
import { useRoomId } from "hooks/useRoomId"

import DamageAnimation from "./DamageAnimation"
import GameUiObject from "./GameUiObject"
import { usePlayerState } from "./hooks/usePlayerState"
import RobotImage from "./RobotImage"

const ROBOT_SIZE = 0.6
const TRANSITION_DURATION = 0.5

export type GameUiPlayerRobotProps = {
  playerId: PlayerId
  playerIndex: number
}

const GameUiPlayerRobotImage = styled(RobotImage)`
  height: 100%;
  pointer-events: none;
  user-select: none;
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
  playerId,
  playerIndex,
}: GameUiPlayerRobotProps) => {
  const roomId = useRoomId()
  const player = usePlayerState(playerId, p => p)
  const playerName = usePlayerName(roomId, playerId)
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
      <GameUiPlayerRobotImage playerIndex={playerIndex} />
      <DamageAnimation damage={player.damage} duration={TRANSITION_DURATION} />
      {player.down && <PlayerSleepIcon />}
    </GameUiObject>
  )
}

export default GameUiPlayerRobot
