import { PlayerStateBasic } from "./PlayerStateBasic"

export type PlayerId = string

export type GameStateBasic<P extends PlayerStateBasic = PlayerStateBasic> = {
  playerOrder: PlayerId[]
  players: Record<PlayerId, P>
}
