import React from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"
import { useRoomData } from "components/room/RoomContext"

import { getRobotImage } from "./RobotImage"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  playerId: PlayerId
  playerIndex: number
  player: RoborallyPlayer
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
  background-size: 80px;
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

const GameUiPlayerCard = ({
  isCurrentUser,
  player,
  playerId,
  playerIndex,
}: GameUiPlayerCardProps) => {
  const roomData = useRoomData()

  const playerName = roomData.players[playerId].name

  return (
    <PlayerCardContainer>
      <PlayerCardRobotImage playerIndex={playerIndex} />
      <PlayerCardContentContainer>
        <PlayerCardContextRow>
          <PlayerCardName>
            {isCurrentUser ? `${playerName} (you)` : playerName}
          </PlayerCardName>
          <PlayerCardScore>Checkpoint: {player.checkpoint}</PlayerCardScore>
        </PlayerCardContextRow>
        <PlayerCardContextRow>
          {player.destroyed ? "Destroyed" : `Damage: ${player.damage}`}
        </PlayerCardContextRow>
        <PlayerCardContextRow>
          {player.ready ? "Ready" : "Waiting..."}
        </PlayerCardContextRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default GameUiPlayerCard
