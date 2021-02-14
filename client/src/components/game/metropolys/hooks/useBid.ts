import { useCallback } from "react"

import { GameType } from "common/GameSettings"
import { MetropolysAction } from "common/metropolys/model/MetropolysAction"
import { MetropolysState } from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerGameAction } from "functions/triggers"
import { useRoomId } from "hooks/useRoomId"

import { useMetropolysContext } from "./useMetropolysContext"
import { useMetropolysState } from "./useMetropolysState"

export function isAbleToBid(
  gameState: MetropolysState,
  userId: PlayerId | null,
  district: number | null,
  height: number | null
): boolean {
  return (
    gameState.currentPlayer === userId && district !== null && height !== null
  )
}

export function useBid(): [() => Promise<void>, boolean] {
  const roomId = useRoomId()

  const { userId } = useAuthContext()
  const {
    resetSelection,
    selectedDistrict,
    selectedHeight,
  } = useMetropolysContext()

  const isEnabled = useMetropolysState(
    useCallback(
      state => isAbleToBid(state, userId, selectedDistrict, selectedHeight),
      [userId, selectedDistrict, selectedHeight]
    )
  )

  const onBid = useCallback(async () => {
    if (isEnabled && selectedDistrict !== null && selectedHeight !== null) {
      const action: MetropolysAction = {
        district: selectedDistrict,
        height: selectedHeight,
        pass: false,
      }

      await triggerGameAction({
        action,
        game: GameType.METROPOLYS,
        roomId,
      })

      resetSelection()
    }
  }, [isEnabled, resetSelection, roomId, selectedDistrict, selectedHeight])

  return [onBid, isEnabled]
}
