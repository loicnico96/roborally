import { useCallback } from "react"

import { GameType } from "common/GameSettings"
import { MetropolysState } from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerGameAction } from "functions/triggers"
import { useRoomId } from "hooks/useRoomId"

import { useMetropolysContext } from "./useMetropolysContext"
import { useMetropolysState } from "./useMetropolysState"

export function isAbleToPass(
  gameState: MetropolysState,
  userId: PlayerId | null
): boolean {
  return gameState.currentPlayer === userId && gameState.bids.length > 0
}

export function usePass(): [() => Promise<void>, boolean] {
  const roomId = useRoomId()

  const { userId } = useAuthContext()
  const { resetSelection } = useMetropolysContext()

  const isEnabled = useMetropolysState(
    useCallback(state => isAbleToPass(state, userId), [userId])
  )

  const onPass = useCallback(async () => {
    if (isEnabled) {
      await triggerGameAction({
        game: GameType.METROPOLYS,
        roomId,
        action: {
          pass: true,
        },
      })

      resetSelection()
    }
  }, [isEnabled, resetSelection, roomId])

  return [onPass, isEnabled]
}
