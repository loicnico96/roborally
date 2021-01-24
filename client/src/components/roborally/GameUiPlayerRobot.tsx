import React from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { usePlayerName } from "hooks/usePlayerName"
import { useRoomId } from "hooks/useRoomId"

import GameUiObject from "./GameUiObject"
import { usePlayerState } from "./hooks/usePlayerState"
import RobotAvatar from "./RobotAvatar"
import {
  getPlayerDestroyed,
  getPlayerPositionX,
  getPlayerPositionY,
  getPlayerRotation,
} from "./utils/getters"

const ROBOT_SIZE = 0.6

export type GameUiPlayerRobotProps = {
  playerId: PlayerId
  playerIndex: number
}

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
  const playerDestroyed = usePlayerState(playerId, getPlayerDestroyed)
  const playerPosX = usePlayerState(playerId, getPlayerPositionX)
  const playerPosY = usePlayerState(playerId, getPlayerPositionY)
  const playerRot = usePlayerState(playerId, getPlayerRotation)
  const playerName = usePlayerName(roomId, playerId)
  const playerTooltip = usePlayerState(playerId, player =>
    getPlayerTooltip(playerName, player)
  )

  return (
    <GameUiObject
      height={ROBOT_SIZE}
      hidden={playerDestroyed}
      rotation={playerRot * 90}
      title={playerTooltip}
      width={ROBOT_SIZE}
      x={playerPosX + (1 - ROBOT_SIZE) / 2}
      y={playerPosY + (1 - ROBOT_SIZE) / 2}
    >
      <RobotAvatar playerId={playerId} playerIndex={playerIndex} />
    </GameUiObject>
  )
}

export default GameUiPlayerRobot
