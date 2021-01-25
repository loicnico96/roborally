import React from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { Program } from "common/roborally/model/Program"
import AsyncButton from "components/ui/AsyncButton"

import { usePlayerReady } from "./hooks/usePlayerReady"
import { useRoborallyPlayer } from "./hooks/useRoborallyPlayer"
import { getPlayerReady } from "./utils/getters"

export type GameUiReadyButtonProps = {
  playerId: PlayerId
  poweredDown: boolean
  program: Program
}

const GameUiReadyButton = ({
  playerId,
  poweredDown,
  program,
}: GameUiReadyButtonProps) => {
  const isReady = useRoborallyPlayer(playerId, getPlayerReady)

  const [onReady, isReadyEnabled] = usePlayerReady(program, poweredDown)

  return (
    <AsyncButton onClick={onReady} disabled={!isReadyEnabled}>
      {isReady ? "Waiting..." : "Ready"}
    </AsyncButton>
  )
}

export default GameUiReadyButton
