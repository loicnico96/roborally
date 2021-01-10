import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData } from "common/model/RoomData"
import AsyncButton from "components/ui/AsyncButton"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomCreate } from "functions/triggers"
import { ROUTES } from "utils/navigation"
import { LoadedResource } from "utils/resources"

import RoomList from "./RoomList"

export type RoomListPageProps = {
  rooms: LoadedResource<RoomData>[]
}

const useCreateRoom = (): [() => Promise<void>, boolean] => {
  const { isAuthenticated } = useAuthContext()
  const history = useHistory()
  const createRoom = useCallback(async () => {
    const game = GameType.ROBORALLY
    const roomId = await triggerRoomCreate({ game })
    history.push(ROUTES.room(roomId))
  }, [history])

  return [createRoom, isAuthenticated]
}

const RoomListPageHeader = styled.div`
  margin-bottom: 24px;
`

const RoomListPage = ({ rooms }: RoomListPageProps) => {
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()

  return (
    <>
      <RoomListPageHeader>
        <AsyncButton onClick={createRoom} disabled={!isCreateRoomEnabled}>
          Create room
        </AsyncButton>
      </RoomListPageHeader>
      <RoomList rooms={rooms} />
    </>
  )
}

export default RoomListPage
