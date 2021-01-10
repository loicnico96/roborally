import React from "react"

import PageHeader from "components/ui/PageHeader"
import { ROUTES } from "utils/navigation"

import { useGameState } from "./hooks/useGameState"

const NAVIGATION_PARENTS = [
  { title: "HOME", path: ROUTES.home() },
  {
    title: "ROOMS",
    path: ROUTES.roomList(),
  },
]

function getRoomTitle(currentTurn: number): string {
  return `Roborally - Turn ${currentTurn}`.toUpperCase()
}

const GameUiHeader = () => {
  const turn = useGameState(state => state.turn)
  return <PageHeader parents={NAVIGATION_PARENTS} title={getRoomTitle(turn)} />
}

export default GameUiHeader
