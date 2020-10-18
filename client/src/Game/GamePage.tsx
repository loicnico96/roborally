import React from "react"
import Game from "./Game"
import { useGameData } from "../Room/hooks/useGameData"
import { useBoardLoader } from "../Room/hooks/useBoardLoader"
import { useSelector } from "react-redux"
import { getBoardState } from "../Redux/selectors/getBoardState"
import { isLoading, isError } from "../utils/ObjectState"

const GamePage = () => {
  const { boardId } = useGameData()

  useBoardLoader(boardId)

  const boardState = useSelector(getBoardState)

  if (boardState === null || isLoading(boardState)) {
    return <div>Loading board...</div>
  }

  if (isError(boardState)) {
    return <div>Invalid board ID</div>
  }

  return <Game />
}

export default GamePage
