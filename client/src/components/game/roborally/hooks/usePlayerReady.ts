import { useCallback } from "react"

import { GameType } from "common/GameSettings"
import { PlayerId } from "common/model/GameStateBasic"
import { isValidProgram } from "common/roborally/isValidProgram"
import { Program } from "common/roborally/model/Program"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerGameAction } from "functions/triggers"
import { useRoomId } from "hooks/useRoomId"

import { getCurrentPhase, getPlayer } from "../utils/getters"

import { useRoborallyState } from "./useRoborallyState"

export function isAbleToReady(
  gameState: RoborallyState,
  userId: PlayerId | null,
  program: Program
): boolean {
  if (userId === null) {
    return false
  }

  const phase = getCurrentPhase(gameState)
  const player = getPlayer(gameState, userId)

  switch (phase) {
    case GamePhase.STANDBY:
      return !player.ready
    case GamePhase.PROGRAM:
      return !player.ready && isValidProgram(program, player)
    default:
      return false
  }
}

export function usePlayerReady(
  program: Program,
  poweredDown: boolean
): [() => Promise<void>, boolean] {
  const roomId = useRoomId()

  const { userId } = useAuthContext()

  const isEnabled = useRoborallyState(
    useCallback(state => isAbleToReady(state, userId, program), [
      program,
      userId,
    ])
  )

  const onReady = useCallback(async () => {
    if (isEnabled) {
      await triggerGameAction({
        game: GameType.ROBORALLY,
        roomId,
        action: {
          program,
          poweredDown,
        },
      })
    }
  }, [isEnabled, poweredDown, program, roomId])

  return [onReady, isEnabled]
}
