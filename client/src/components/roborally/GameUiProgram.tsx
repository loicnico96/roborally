import React, { useCallback, useEffect, useMemo, useState } from "react"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomId } from "common/model/RoomData"
import { isValidProgram } from "common/roborally/isValidProgram"
import { Card } from "common/roborally/model/Card"
import { getEmptyProgram, Program } from "common/roborally/model/Program"
import {
  getLockedProgram,
  isAbleToMove,
} from "common/roborally/model/RoborallyPlayer"
import {
  GamePhase,
  RoborallyState,
} from "common/roborally/model/RoborallyState"
import AsyncButton from "components/ui/AsyncButton"
import { triggerGameAction } from "functions/triggers"

import GameUiCard from "./GameUiCard"

type GameUiProgramProps = {
  gameState: RoborallyState
  playerId: PlayerId
  roomId: RoomId
}

const GameUiProgram = ({ gameState, playerId, roomId }: GameUiProgramProps) => {
  const { phase, players } = gameState
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
    await triggerGameAction({
      roomId,
      action: {
        program,
        poweredDown,
      },
    })
  }, [roomId, program, poweredDown])

  const shownProgram = phase === GamePhase.PROGRAM ? program : player.program

  const isResolving = ![GamePhase.PROGRAM, GamePhase.STANDBY].includes(phase)
  const isValid = phase !== GamePhase.PROGRAM || isValidProgram(program, player)

  return (
    <div id="GameUiProgram">
      <div id="GameUiProgramSequence">
        {shownProgram.map((card, index) => (
          <GameUiCard
            key={index}
            card={card}
            disabled={
              card === null ||
              lockedProgram[index] !== null ||
              phase !== GamePhase.PROGRAM
            }
            isDisabled={card === null || !isAbleToMove(player)}
            isHighlighted={isResolving && gameState.sequence === index}
            isLocked={lockedProgram[index] !== null}
            onClick={() => onRemoveCard(index)}
          />
        ))}
      </div>
      {phase === GamePhase.PROGRAM && (
        <div id="GameUiPlayerHand">
          {hand.map(card => (
            <GameUiCard
              key={card}
              card={card}
              disabled={!program.includes(null)}
              onClick={() => onPlayCard(card)}
            />
          ))}
        </div>
      )}
      <button disabled>Powered {player.down ? "down" : "up"}</button>
      <button
        onClick={onTogglePoweredDown}
        disabled={phase !== GamePhase.PROGRAM}
      >
        Initiate {poweredDown ? "ON" : "OFF"}
      </button>
      <AsyncButton onClick={onReady} disabled={player.ready || !isValid}>
        {player.ready ? "Waiting..." : "Ready"}
      </AsyncButton>
    </div>
  )
}

export default GameUiProgram
