import React from "react"
import { PlayerId } from "common/model/GameStateBasic"
import { useRoomData } from "components/room/RoomContext"
import { RoborallyPlayer } from "common/roborally/model/RoborallyPlayer"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  playerId: PlayerId
  player: RoborallyPlayer
}

const GameUiPlayerCard = ({
  isCurrentUser,
  player,
  playerId,
}: GameUiPlayerCardProps) => {
  const roomData = useRoomData()

  const playerName = roomData.players[playerId].name

  return (
    <div>
      <p>{isCurrentUser ? <b>{playerName}</b> : playerName}</p>
      <p>Checkpoint: {player.checkpoint}</p>
      <p>Damage: {player.damage}</p>
      {player.destroyed && <p>Destroyed</p>}
      <p>{player.ready ? "Ready" : "Waiting..."}</p>
    </div>
  )
}

export default GameUiPlayerCard
