import React from "react"
import { PlayerId, PlayerState } from "common/roborally/model/PlayerState"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  player: PlayerState
  playerId: PlayerId
}

const GameUiPlayerCard = ({
  isCurrentUser,
  player,
  playerId,
}: GameUiPlayerCardProps) => (
  <div>
    <p>{isCurrentUser ? <b>{playerId}</b> : playerId}</p>
    <p>Checkpoint: {player.checkpoint}</p>
    <p>Damage: {player.damage}</p>
    {player.destroyed && <p>Destroyed</p>}
    <p>{player.ready ? "Ready" : "Waiting..."}</p>
  </div>
)

export default GameUiPlayerCard
