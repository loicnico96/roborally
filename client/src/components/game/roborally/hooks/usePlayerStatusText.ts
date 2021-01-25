import { useCallback } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import {
  CardAction,
  getCardAction,
  getCardPriority,
} from "common/roborally/model/Card"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"

import { useRoborallyState } from "./useRoborallyState"

export function getPlayerStatusText(
  gameState: RoborallyState,
  playerId: PlayerId
): string {
  const player = gameState.players[playerId]

  if (gameState.winners?.includes(playerId) ?? false) {
    return "Winner!"
  }

  const readyPhases = [GamePhase.STANDBY, GamePhase.PROGRAM]
  if (readyPhases.includes(gameState.phase)) {
    return player.ready ? "Ready" : "Waiting..."
  }

  if (player.down) {
    return "Powered Down"
  }

  if (player.destroyed) {
    return "Destroyed"
  }

  const card = player.program[gameState.sequence]
  if (card !== null) {
    const action = {
      [CardAction.MOVE_1]: "Speed 1",
      [CardAction.MOVE_2]: "Speed 2",
      [CardAction.MOVE_3]: "Speed 3",
      [CardAction.MOVE_BACK]: "Back Up",
      [CardAction.ROTATE_LEFT]: "Rotate Left",
      [CardAction.ROTATE_RIGHT]: "Rotate Right",
      [CardAction.ROTATE_BACK]: "U-Turn",
    }[getCardAction(card)]

    return `${action} (${getCardPriority(card)})`
  }

  return "Waiting..."
}

export function usePlayerStatusText(playerId: PlayerId): string {
  return useRoborallyState(
    useCallback(state => getPlayerStatusText(state, playerId), [playerId])
  )
}
