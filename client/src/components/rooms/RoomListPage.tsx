import { GameType, RoomData, RoomId } from "common/model/RoomData"
import { triggerRoomCreate } from "functions/triggers"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { ROUTES } from "utils/navigation"
import RoomList from "./RoomList"

export type RoomListPageProps = {
  rooms: Record<RoomId, RoomData>
}

const useCreateRoom = () => {
  const history = useHistory()
  const userId = useCurrentUserId()
  return useCallback(async () => {
    const roomId = await triggerRoomCreate({ game: GameType.ROBORALLY, userId })
    history.push(ROUTES.room(roomId))
  }, [history, userId])
}

const useOpenRoom = () => {
  const history = useHistory()
  return useCallback(
    (roomId: RoomId) => {
      history.push(ROUTES.room(roomId))
    },
    [history]
  )
}

const RoomListPage = ({ rooms }: RoomListPageProps) => {
  const createRoom = useCreateRoom()
  const openRoom = useOpenRoom()

  return (
    <div id="RoomsPageContainer">
      <div id="RoomsPageHeader">
        <button id="CreateRoomButton" onClick={createRoom}>
          Create room
        </button>
      </div>
      <RoomList onItemClick={openRoom} rooms={rooms} />
    </div>
  )
}

export default RoomListPage
