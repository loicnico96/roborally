import React from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import {
  CardAction,
  getCardAction,
  getCardPriority,
} from "common/roborally/model/Card"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import { useGameState } from "components/room/GameContext"
import { useRoomData } from "components/room/RoomContext"

import { getRobotImage } from "./RobotImage"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  playerId: PlayerId
  playerIndex: number
}

const PlayerCardContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  border-color: #888;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`

type PlayerCardRobotImageProps = {
  playerIndex: number
}

function getRobotUrl({ playerIndex }: PlayerCardRobotImageProps): string {
  return getRobotImage(playerIndex)
}

const PlayerCardRobotImage = styled.div`
  background-image: url(${getRobotUrl});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 80px;
  margin-right: 16px;
  width: 80px;
`

const PlayerCardContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`

const PlayerCardContextRow = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 4px 0px;
  width: 272px;
`

const PlayerCardName = styled.div`
  flex: 1 1 0;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PlayerCardScore = styled.div``

function getPlayerStatusText(
  playerId: PlayerId,
  player: RoborallyPlayer,
  gameState: RoborallyState
): string {
  if (gameState.winners !== null) {
    if (gameState.winners.includes(playerId)) {
      return "Winner!"
    }
  }

  const readyPhases = [GamePhase.STANDBY, GamePhase.PROGRAM]
  if (readyPhases.includes(gameState.phase)) {
    return player.ready ? "Ready" : "Waiting..."
  }

  if (player.down) {
    return "Powered Down"
  }

  if (player.destroyed) {
    return "Destroyed"
  }

  const card = player.program[gameState.sequence]
  if (card !== null) {
    const action = {
      [CardAction.MOVE_1]: "Speed 1",
      [CardAction.MOVE_2]: "Speed 2",
      [CardAction.MOVE_3]: "Speed 3",
      [CardAction.MOVE_BACK]: "Back Up",
      [CardAction.ROTATE_LEFT]: "Rotate Left",
      [CardAction.ROTATE_RIGHT]: "Rotate Right",
      [CardAction.ROTATE_BACK]: "U-Turn",
    }[getCardAction(card)]

    return `${action} (${getCardPriority(card)})`
  }

  return "Waiting..."
}

const GameUiPlayerCard = ({
  isCurrentUser,
  playerId,
  playerIndex,
}: GameUiPlayerCardProps) => {
  const roomData = useRoomData()
  const gameState = useGameState()

  const player = gameState.players[playerId]
  const playerName = roomData.players[playerId].name
  const totalCheckpoints = gameState.checkpoints.length - 1

  return (
    <PlayerCardContainer>
      <PlayerCardRobotImage playerIndex={playerIndex} />
      <PlayerCardContentContainer>
        <PlayerCardContextRow>
          <PlayerCardName>
            {isCurrentUser ? `${playerName} (you)` : playerName}
          </PlayerCardName>
          <PlayerCardScore>
            Checkpoint: {player.checkpoint} / {totalCheckpoints}
          </PlayerCardScore>
        </PlayerCardContextRow>
        <PlayerCardContextRow>Damage: {player.damage}</PlayerCardContextRow>
        <PlayerCardContextRow>
          {getPlayerStatusText(playerId, player, gameState)}
        </PlayerCardContextRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default GameUiPlayerCard
