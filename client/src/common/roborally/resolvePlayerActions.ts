import { PlayerId } from "common/model/GameStateBasic"
import { sortBy, SortDirection } from "common/utils/arrays"
import { Card, getCardPriority } from "./model/Card"
import { RoborallyState } from "./model/RoborallyState"

export type PlayerAction = {
  playerId: PlayerId
  card: Card
}

export function getOrderedPlayerActions(
  { players }: RoborallyState,
  sequence: number
): PlayerAction[] {
  const playerActions: PlayerAction[] = []
  Object.keys(players).forEach(playerId => {
    const player = players[playerId]
    const card = player.program[sequence]
    if (card !== null && !player.destroyed) {
      playerActions.push({
        playerId,
        card,
      })
    }
  })

  return sortBy(
    playerActions,
    action => getCardPriority(action.card),
    SortDirection.DESC
  )
}
