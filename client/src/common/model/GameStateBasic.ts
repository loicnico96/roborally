import { PlayerStateBasic } from "./PlayerStateBasic"

export type PlayerId = string

export type GameStateBasic = {
  playerOrder: PlayerId[]
  players: Record<PlayerId, PlayerStateBasic>
  turn: number
  winners?: PlayerId[]
}
