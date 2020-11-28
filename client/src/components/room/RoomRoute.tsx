import React from "react"
import { useParams } from "react-router-dom"

import { RoomId, RoomStatus } from "common/model/RoomData"
import GamePage from "components/roborally/GamePage"

import GameContextProvider from "./GameContextProvider"
import RoomContextProvider from "./RoomContextProvider"
import RoomPage from "./RoomPage"

export type RoomRouteParams = {
  roomId: RoomId
}

const RoomRoute = () => {
  const { roomId } = useParams<RoomRouteParams>()

  return (
    <RoomContextProvider
      roomId={roomId}
      renderError={() => <div>Invalid room ID</div>}
      renderLoading={() => <div>Loading room...</div>}
      renderLoaded={data => {
        if (data.status === RoomStatus.OPENED) {
          return <RoomPage />
        }

        return (
          <GameContextProvider
            roomId={roomId}
            renderError={() => <div>Invalid room ID</div>}
            renderLoading={() => <div>Loading game...</div>}
            renderLoaded={() => <GamePage />}
          />
        )
      }}
    />
  )
}

export default React.memo(RoomRoute)
