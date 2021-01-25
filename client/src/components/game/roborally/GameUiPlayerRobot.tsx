import React from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"

import GameUiObject from "./GameUiObject"
import { useRoborallyPlayer } from "./hooks/useRoborallyPlayer"
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

function getPlayerTooltip(player: RoborallyPlayer): string {
  const qualifiers: string[] = []

  if (player.down) {
    qualifiers.push("powered down")
  }

  if (player.virtual) {
    qualifiers.push("virtual")
  }

  if (qualifiers.length > 0) {
    return `${player.name} (${qualifiers.join(", ")})`
  } else {
    return player.name
  }
}

const GameUiPlayerRobot = ({
  playerId,
  playerIndex,
}: GameUiPlayerRobotProps) => {
  const playerDestroyed = useRoborallyPlayer(playerId, getPlayerDestroyed)
  const playerPosX = useRoborallyPlayer(playerId, getPlayerPositionX)
  const playerPosY = useRoborallyPlayer(playerId, getPlayerPositionY)
  const playerRot = useRoborallyPlayer(playerId, getPlayerRotation)
  const playerTooltip = useRoborallyPlayer(playerId, getPlayerTooltip)

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
