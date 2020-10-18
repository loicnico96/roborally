import { useCallback } from "react"
import { useDispatch } from "../../Redux"
import { setGameState } from "../../Redux/actions/setGameState"
import { useFirestoreLoader, Collection } from "../../Firestore"
import { ObjectId, ObjectState } from "../../utils/ObjectState"
import { GameData } from "../../common/GameData"

export function useGameLoader(gameId: ObjectId) {
  const dispatch = useDispatch()
  const handler = useCallback(
    (state: ObjectState<GameData> | null) => {
      dispatch(setGameState(state))
    },
    [dispatch]
  )

  useFirestoreLoader(Collection.GAME, gameId, handler)
}
