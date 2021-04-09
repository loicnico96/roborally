import React, { useEffect } from "react"
import styled from "styled-components"

import { getHighestBid } from "common/metropolys/model/MetropolysState"
import { PlayerId } from "common/model/GameStateBasic"
import AsyncButton from "components/ui/AsyncButton"
import { usePrevious } from "hooks/usePrevious"

import { useBid } from "./hooks/useBid"
import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysPlayer } from "./hooks/useMetropolysPlayer"
import { useMetropolysState } from "./hooks/useMetropolysState"
import { usePass } from "./hooks/usePass"
import { getPlayerBuildings, getPlayerReady } from "./utils/getters"

export type MetropolysActionBannerProps = {
  playerId: PlayerId
}

const ActionBanner = styled.div`
  background-color: red;
  border-top: 1px solid #888;
  box-shadow: 0px 2px 2px #888;
  padding: 8px;
  text-align: center;
  width: 100%;
`

const MetropolysActionBanner = ({ playerId }: MetropolysActionBannerProps) => {
  const [onBid, isBidEnabled] = useBid()
  const [onPass, isPassEnabled] = usePass()

  const playerBuildings = useMetropolysPlayer(playerId, getPlayerBuildings)

  const highestBid = useMetropolysState(getHighestBid)
  const minBidHeight = highestBid ? highestBid.height + 1 : 0

  const { resetSelection, selectHeight } = useMetropolysContext()

  const turn = useMetropolysState(state => state.turn)
  const previousTurn = usePrevious(turn)

  const ready = useMetropolysPlayer(playerId, getPlayerReady)
  const previousReady = usePrevious(ready)

  useEffect(() => {
    if (previousTurn !== turn || previousReady !== ready) {
      if (ready) {
        resetSelection()
      } else {
        const smallestSelectableHeight = playerBuildings.findIndex(
          (isAvailable, height) => isAvailable && height >= minBidHeight
        )

        if (smallestSelectableHeight >= 0) {
          selectHeight(smallestSelectableHeight)
        }
      }
    }
  }, [
    minBidHeight,
    playerBuildings,
    previousReady,
    previousTurn,
    ready,
    resetSelection,
    selectHeight,
    turn,
  ])

  if (ready) {
    return null
  }

  return (
    <ActionBanner id="MetropolysActionBanner">
      {"It's your turn! Choose an action: "}
      <AsyncButton disabled={!isBidEnabled} onClick={onBid}>
        Bid
      </AsyncButton>
      <AsyncButton disabled={!isPassEnabled} onClick={onPass}>
        Pass
      </AsyncButton>
    </ActionBanner>
  )
}

export default MetropolysActionBanner
