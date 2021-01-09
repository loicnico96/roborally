import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { RoomId } from "common/model/RoomData"
import { isValidProgram } from "common/roborally/isValidProgram"
import { Card } from "common/roborally/model/Card"
import { getEmptyProgram, Program } from "common/roborally/model/Program"
import {
  getLockedProgram,
  isAbleToMove,
  RoborallyPlayer,
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

const GameUiProgramSequence = styled.div`
  align-items: center;
  display: flex;
`

const GameUiProgramWarning = styled.div`
  flex: 1 1 auto;
  padding: 8px;
`

function getWarningText(
  player: RoborallyPlayer,
  phase: GamePhase,
  powerDown: boolean
): string {
  if (phase === GamePhase.PROGRAM && powerDown) {
    return "You are about to initiate power down. At the start of your turn, all damage to your robot will be repaired, but your robot will be unable to move or fire lasers during the whole turn."
  } else if (player.destroyed) {
    return "Your robot has been destroyed! It will respawn at the last checkpoint at the end of this turn."
  } else if (player.down) {
    return "Your robot is powered down. It cannot move or fire lasers this turn."
  } else if (player.downNext) {
    return "Your robot will power down next turn. It will not be able to move or fire lasers during the whole turn."
  } else if (getLockedProgram(player).some(card => card !== null)) {
    return "Your robot has taken a lot of damage and some registers have been locked. Your robot will execute the locked action each turn."
  } else if (player.damage > 0) {
    return "Your robot has taken damage. You will draw less Program Cards at the start of each turn."
  } else if (player.virtual) {
    return "Your robot is currently virtual. It ignores collisions with other robots and lasers, but is still affected by other board elements."
  } else {
    return ""
  }
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
      <GameUiProgramSequence>
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
        <GameUiProgramWarning>
          {getWarningText(player, phase, poweredDown)}
        </GameUiProgramWarning>
      </GameUiProgramSequence>
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
