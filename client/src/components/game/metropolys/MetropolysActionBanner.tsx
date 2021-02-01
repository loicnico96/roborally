import React from "react"

import AsyncButton from "components/ui/AsyncButton"

import { useBid } from "./hooks/useBid"
import { usePass } from "./hooks/usePass"

const MetropolysActionBanner = () => {
  const [onBid, isBidEnabled] = useBid()
  const [onPass, isPassEnabled] = usePass()

  return (
    <div id="TurnActions">
      {"It's your turn! Choose an action: "}
      <AsyncButton disabled={!isBidEnabled} onClick={onBid}>
        Bid
      </AsyncButton>
      <AsyncButton disabled={!isPassEnabled} onClick={onPass}>
        Pass
      </AsyncButton>
    </div>
  )
}

export default MetropolysActionBanner
