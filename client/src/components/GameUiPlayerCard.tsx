import React from "react"
import {
  PlayerId,
  RoborallyPlayer,
} from "common/roborally/model/RoborallyPlayer"

type GameUiPlayerCardProps = {
  isCurrentUser: boolean
  player: RoborallyPlayer
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
