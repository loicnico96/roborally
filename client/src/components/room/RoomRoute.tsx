import React from "react"
import { useParams } from "react-router-dom"

import { RoomId, RoomStatus } from "common/model/RoomData"
import GamePage from "components/roborally/GamePage"
import { renderError } from "components/ui/PageError"
import { renderLoader } from "components/ui/PageLoader"

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
      renderError={renderError}
      renderLoading={() => renderLoader("Loading room...")}
      renderLoaded={data => {
        if (data.status === RoomStatus.OPENED) {
          return <RoomPage />
        }

        return (
          <GameContextProvider
            roomId={roomId}
            renderError={renderError}
            renderLoading={() => renderLoader("Loading game...")}
            renderLoaded={() => <GamePage />}
          />
        )
      }}
    />
  )
}

export default React.memo(RoomRoute)
