import { useCallback } from "react"
import { useHistory } from "react-router-dom"

import { GameType } from "common/GameSettings"
import { isEnum } from "common/utils/enums"
import { useSearchParams } from "hooks/useSearchParams"

export function useGameParam() {
  const history = useHistory()
  const searchParams = useSearchParams()

  const gameParam = searchParams.get("game")
  const gameType = isEnum(gameParam, GameType) ? gameParam : undefined

  const setGameType = useCallback(
    (newGameType: GameType | undefined) => {
      if (newGameType) {
        searchParams.set("game", newGameType)
      } else {
        searchParams.delete("game")
      }

      history.push({ search: searchParams.toString() })
    },
    [history, searchParams]
  )

  return {
    gameType,
    setGameType,
  }
}
