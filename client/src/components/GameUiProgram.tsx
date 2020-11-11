import React, { useCallback, useEffect, useMemo, useState } from "react"
import { GamePhase, GameState } from "common/model/GameState"
import { getLockedProgram, PlayerId } from "common/model/PlayerState"
import { RoomId } from "common/model/RoomData"
import { triggerReady } from "functions/triggers"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { getEmptyProgram, Program } from "common/model/Program"
import { Card } from "common/model/Card"
import GameUiCard from "./GameUiCard"

type GameUiProgramProps = {
  gameState: GameState
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

  const onReadyUnsafe = useCallback(async () => {
    await triggerReady({
      gameId: roomId,
      playerId,
      program,
      poweredDown,
      phase,
      turn,
    })
  }, [roomId, playerId, program, poweredDown, phase, turn])

  const [onReady, onReadyLoading] = useAsyncHandler(onReadyUnsafe)

  const shownProgram = phase === GamePhase.PROGRAM ? program : player.program

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
      <button onClick={onReady} disabled={player.ready || onReadyLoading}>
        {player.ready || onReadyLoading ? "Waiting..." : "Ready"}
      </button>
    </div>
  )
}

export default GameUiProgram
