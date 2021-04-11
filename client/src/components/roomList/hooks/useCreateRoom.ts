import { useCallback } from "react"
import { useHistory } from "react-router-dom"

import { GameType } from "common/GameSettings"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomCreate } from "functions/triggers"
import { ROUTES } from "utils/navigation"

export function useCreateRoom(): [(game: GameType) => Promise<void>, boolean] {
  const { isAuthenticated } = useAuthContext()
  const history = useHistory()
  const createRoom = useCallback(
    async (game: GameType) => {
      const roomId = await triggerRoomCreate({ game })
      history.push(ROUTES.room(roomId))
    },
    [history]
  )

  return [createRoom, isAuthenticated]
}
