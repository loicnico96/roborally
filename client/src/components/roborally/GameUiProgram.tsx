import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import { PlayerId } from "common/model/GameStateBasic"
import { Card } from "common/roborally/model/Card"
import { getEmptyProgram, Program } from "common/roborally/model/Program"
import {
  getLockedProgram,
  isAbleToMove,
  RoborallyPlayer,
} from "common/roborally/model/RoborallyPlayer"
import { GamePhase } from "common/roborally/model/RoborallyState"

import GameUiCard from "./GameUiCard"
import GameUiPowerDownButton from "./GameUiPowerDownButton"
import GameUiReadyButton from "./GameUiReadyButton"
import { useRoborallyState } from "./hooks/useRoborallyState"
import { useRoborallyPlayer } from "./hooks/useRoborallyPlayer"

type GameUiProgramProps = {
  playerId: PlayerId
}

const GameUiProgramSequence = styled.div`
  align-items: center;
  display: flex;
`

const GameUiProgramWarning = styled.div`
  flex: 1 1 auto;
  padding: 8px;
`

function getPlayerStatusText(player: RoborallyPlayer): string {
  if (player.destroyed) {
    return "Your robot has been destroyed! It will respawn at the last checkpoint at the end of this turn."
  }

  if (player.down) {
    return "Your robot is powered down. It cannot move or fire lasers this turn."
  }

  if (player.downNext) {
    return "Your robot will power down next turn. It will not be able to move or fire lasers during that turn."
  }

  if (getLockedProgram(player).some(card => card !== null)) {
    return "Your robot has taken a lot of damage and some registers have been locked. The locked actions will be executed each turn."
  }

  if (player.damage > 0) {
    return "Your robot has taken damage. You will draw less Program Cards at the start of each turn."
  }

  if (player.virtual) {
    return "Your robot is virtual. It ignores collisions with other robots and lasers, but is still affected by other board elements."
  }

  return ""
}

function getWarningText(phase: GamePhase, powerDown: boolean): string {
  if (phase === GamePhase.PROGRAM && powerDown) {
    return "You are about to initiate power down. At the start of your turn, all damage to your robot will be repaired, but your robot will be unable to move or fire lasers during the whole turn."
  } else {
    return ""
  }
}

const GameUiProgram = ({ playerId }: GameUiProgramProps) => {
  const currentPhase = useRoborallyState(state => state.phase)
  const sequence = useRoborallyState(state => state.sequence)

  const playerCards = useRoborallyPlayer(playerId, player => player.cards)
  const playerDown = useRoborallyPlayer(playerId, player => player.down)
  const playerDownNext = useRoborallyPlayer(playerId, player => player.downNext)
  const playerProgram = useRoborallyPlayer(playerId, player => player.program)
  const lockedProgram = useRoborallyPlayer(playerId, getLockedProgram)
  const playerStatusText = useRoborallyPlayer(playerId, getPlayerStatusText)
  const playerAbleToMove = useRoborallyPlayer(playerId, isAbleToMove)

  const [program, setProgram] = useState(getEmptyProgram())
  const [downNext, setDownNext] = useState(false)

  const hand = playerCards.filter(card => !program.includes(card))

  useEffect(() => {
    if (currentPhase !== GamePhase.PROGRAM) {
      setDownNext(playerDownNext)
      setProgram(lockedProgram)
    }
  }, [currentPhase, lockedProgram, playerDownNext])

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

  const isProgramPhase = currentPhase === GamePhase.PROGRAM
  const shownProgram = isProgramPhase ? program : playerProgram

  const isResolving = ![GamePhase.PROGRAM, GamePhase.STANDBY].includes(
    currentPhase
  )

  return (
    <div id="GameUiProgram">
      <GameUiProgramSequence>
        {shownProgram.map((card, index) => (
          <GameUiCard
            key={index}
            card={card}
            disabled={
              card === null || lockedProgram[index] !== null || !isProgramPhase
            }
            isDisabled={card === null || !playerAbleToMove}
            isHighlighted={isResolving && sequence === index}
            isLocked={lockedProgram[index] !== null}
            onClick={() => onRemoveCard(index)}
          />
        ))}
        <GameUiProgramWarning>
          {getWarningText(currentPhase, downNext) || playerStatusText}
        </GameUiProgramWarning>
      </GameUiProgramSequence>
      {isProgramPhase && (
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
      <GameUiPowerDownButton
        disabled
        isPoweredDown={playerDown}
        titlePoweredDown="Powered down"
        titlePoweredUp="Powered up"
      />
      <GameUiPowerDownButton
        disabled={!isProgramPhase}
        isPoweredDown={downNext}
        onChange={setDownNext}
        titlePoweredDown="Initiate ON"
        titlePoweredUp="Initiate OFF"
      />
      <GameUiReadyButton
        playerId={playerId}
        poweredDown={downNext}
        program={program}
      />
    </div>
  )
}

export default GameUiProgram
