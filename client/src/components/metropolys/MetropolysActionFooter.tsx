import { PlayerId } from "common/model/GameStateBasic"
import AsyncButton from "components/ui/AsyncButton"
import { triggerGameAction } from "functions/triggers"
import { useRoomId } from "hooks/useRoomId"
import React, { useCallback } from "react"

export type MetropolysActionFooterProps = {
  playerId: PlayerId
}

const MetropolysActionFooter = () => {
  const roomId = useRoomId()

  const onBid = useCallback(async () => {
    // eslint-disable-next-line no-alert
    const district = window.prompt("District")
    if (district === null) {
      return
    }

    // eslint-disable-next-line no-alert
    const height = window.prompt("Height")
    if (height === null) {
      return
    }

    await triggerGameAction({
      roomId,
      action: {
        district: Number.parseInt(district, 10),
        height: Number.parseInt(height, 10),
        pass: false,
      },
    })
  }, [roomId])

  const onPass = useCallback(async () => {
    await triggerGameAction({
      roomId,
      action: {
        pass: true,
      },
    })
  }, [roomId])

  return (
    <div>
      <AsyncButton onClick={onBid}>
        Bid
      </AsyncButton>
      <AsyncButton onClick={onPass}>
        Pass
      </AsyncButton>
    </div>
  )
}

export default MetropolysActionFooter
