export type PlayerId = string
export type PlayerState = {}

export type GameState = {
  robots: Record<PlayerId, PlayerState>
}
