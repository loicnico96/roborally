export type PlayerId = string

export type PlayerStateBasic = {
  name: string
  ready: boolean
}

export type GameStateBasic = {
  playerOrder: PlayerId[]
  players: Record<PlayerId, PlayerStateBasic>
  turn: number
  winners?: PlayerId[]
}
