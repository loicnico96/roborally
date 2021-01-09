import React from "react"

import PageHeader from "components/ui/PageHeader"
import { ROUTES } from "utils/navigation"

const NAVIGATION_PARENTS = [
  { title: "HOME", path: ROUTES.home() },
  {
    title: "ROOMS",
    path: ROUTES.roomList(),
  },
]

type GameUiHeaderProps = {
  currentTurn: number
}

function getRoomTitle(currentTurn: number): string {
  return `Roborally - Turn ${currentTurn}`.toUpperCase()
}

const GameUiHeader = ({ currentTurn }: GameUiHeaderProps) => (
  <PageHeader parents={NAVIGATION_PARENTS} title={getRoomTitle(currentTurn)} />
)

export default GameUiHeader
