import React from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { usePlayerName } from "hooks/usePlayerName"
import { useRoomId } from "hooks/useRoomId"

import { useRoborallyState } from "./hooks/useRoborallyState"
import { useRoborallyPlayer } from "./hooks/useRoborallyPlayer"
import { usePlayerStatusText } from "./hooks/usePlayerStatusText"
import RobotAvatar from "./RobotAvatar"
import {
  getPlayerCheckpoint,
  getPlayerDamage,
  getTotalCheckpoints,
} from "./utils/getters"

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

const PlayerCardRobotContainer = styled.div`
  height: 80px;
  margin-right: 16px;
  position: relative;
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
  playerId,
  playerIndex,
}: GameUiPlayerCardProps) => {
  const roomId = useRoomId()
  const playerCheckpoint = useRoborallyPlayer(playerId, getPlayerCheckpoint)
  const playerDamage = useRoborallyPlayer(playerId, getPlayerDamage)
  const playerName = usePlayerName(roomId, playerId)
  const playerStatus = usePlayerStatusText(playerId)
  const totalCheckpoints = useRoborallyState(getTotalCheckpoints)

  return (
    <PlayerCardContainer>
      <PlayerCardRobotContainer>
        <RobotAvatar playerId={playerId} playerIndex={playerIndex} />
      </PlayerCardRobotContainer>
      <PlayerCardContentContainer>
        <PlayerCardContextRow>
          <PlayerCardName>
            {isCurrentUser ? `${playerName} (you)` : playerName}
          </PlayerCardName>
          <PlayerCardScore>
            Checkpoint: {playerCheckpoint} / {totalCheckpoints}
          </PlayerCardScore>
        </PlayerCardContextRow>
        <PlayerCardContextRow>Damage: {playerDamage}</PlayerCardContextRow>
        <PlayerCardContextRow>{playerStatus}</PlayerCardContextRow>
      </PlayerCardContentContainer>
    </PlayerCardContainer>
  )
}

export default GameUiPlayerCard
