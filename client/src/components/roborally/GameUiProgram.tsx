import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import { getLockedProgram } from "common/roborally/model/RoborallyPlayer"
import { RoomId } from "common/model/RoomData"
import { triggerReady } from "functions/triggers"
import { getEmptyProgram, Program } from "common/roborally/model/Program"
import { Card } from "common/roborally/model/Card"
import GameUiCard from "./GameUiCard"
import { PlayerId } from "common/model/GameStateBasic"
import AsyncButton from "components/primitives/AsyncButton"

type GameUiProgramProps = {
  gameState: RoborallyState
  playerId: PlayerId
  roomId: RoomId
}

const GameUiProgram = ({ gameState, playerId, roomId }: GameUiProgramProps) => {
  const { phase, players, turn } = gameState
  const player = players[playerId]
  const { downNext, cards } = player

  const lockedProgram = useMemo(() => getLockedProgram(player), [player])

  const [program, setProgram] = useState(getEmptyProgram())
  const [poweredDown, setPoweredDown] = useState(false)

  const hand = cards.filter(card => !program.includes(card))

  useEffect(() => {
    if (phase !== GamePhase.PROGRAM) {
      setPoweredDown(downNext)
      setProgram(lockedProgram)
    }
  }, [phase, lockedProgram, downNext])

  const onPlayCard = useCallback(
    (card: Card) => {
      const index = program.indexOf(null)
      if (index >= 0 && hand.includes(card)) {
        setProgram(program.map((c, i) => (i === index ? card : c)) as Program)
      }
    },
    [program, hand]
  )

  const onRemoveCard = useCallback(
    (index: number) => {
      if (program[index] !== null && lockedProgram[index] === null) {
        setProgram(program.map((c, i) => (i === index ? null : c)) as Program)
      }
    },
    [program, lockedProgram]
  )

  const onTogglePoweredDown = useCallback(() => {
    setPoweredDown(!poweredDown)
  }, [poweredDown])

  const onReady = useCallback(async () => {
    await triggerReady({
      gameId: roomId,
      program,
      poweredDown,
      phase,
      turn,
    })
  }, [roomId, program, poweredDown, phase, turn])

  const shownProgram = phase === GamePhase.PROGRAM ? program : player.program

  const isResolving = ![GamePhase.PROGRAM, GamePhase.STANDBY].includes(phase)

  return (
    <div id="GameUiProgram">
      <div id="GameUiProgramSequence">
        {shownProgram.map((card, index) => (
          <GameUiCard
            key={index}
            card={card}
            disabled={
              lockedProgram[index] !== null ||
              card === null ||
              phase !== GamePhase.PROGRAM
            }
            isHighlighted={isResolving && gameState.sequence === index}
            isLocked={lockedProgram[index] !== null}
            onClick={() => onRemoveCard(index)}
          />
        ))}
      </div>
      <div id="GameUiPlayerHand">
        {hand.map(card => (
          <GameUiCard
            key={card}
            card={card}
            disabled={!program.includes(null) || phase !== GamePhase.PROGRAM}
            onClick={() => onPlayCard(card)}
          />
        ))}
      </div>
      <button disabled>Powered {player.down ? "down" : "up"}</button>
      <button
        onClick={onTogglePoweredDown}
        disabled={phase !== GamePhase.PROGRAM}
      >
        Initiate {poweredDown ? "ON" : "OFF"}
      </button>
      <AsyncButton onClick={onReady} disabled={player.ready}>
        {player.ready ? "Waiting..." : "Ready"}
      </AsyncButton>
    </div>
  )
}

export default GameUiProgram
