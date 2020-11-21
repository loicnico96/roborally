import { RoomData, RoomId } from "common/model/RoomData"
import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import { ROUTES } from "utils/navigation"
import RoomList from "./RoomList"

export type RoomListPageProps = {
  rooms: Record<RoomId, RoomData>
}

const useCreateRoom = () =>
  useCallback(() => {
    // TODO: Cloud Function
    console.log("Create room")
  }, [])

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
