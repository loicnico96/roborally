import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData } from "common/model/RoomData"
import AsyncButton from "components/ui/AsyncButton"
import PageContent from "components/ui/PageContent"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomCreate } from "functions/triggers"
import { ROUTES } from "utils/navigation"
import { LoadedResource } from "utils/resources"

import RoomList from "./RoomList"

export type RoomListPageProps = {
  rooms: LoadedResource<RoomData>[]
}

const useCreateRoom = (): [(game: GameType) => Promise<void>, boolean] => {
  const { isAuthenticated } = useAuthContext()
  const history = useHistory()
  const createRoom = useCallback(
    async (game: GameType) => {
      const roomId = await triggerRoomCreate({ game })
      history.push(ROUTES.room(roomId))
    },
    [history]
  )

  return [createRoom, isAuthenticated]
}

const RoomListPageHeader = styled.div`
  margin-bottom: 24px;
`

const RoomListPage = ({ rooms }: RoomListPageProps) => {
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()

  const createRoomMetropolys = useCallback(
    async () => createRoom(GameType.METROPOLYS),
    [createRoom]
  )

  const createRoomRoborally = useCallback(
    async () => createRoom(GameType.ROBORALLY),
    [createRoom]
  )

  return (
    <PageContent>
      <RoomListPageHeader>
        <AsyncButton
          onClick={createRoomMetropolys}
          disabled={!isCreateRoomEnabled}
        >
          Create Metropolys room
        </AsyncButton>
        <AsyncButton
          onClick={createRoomRoborally}
          disabled={!isCreateRoomEnabled}
        >
          Create Roborally room
        </AsyncButton>
      </RoomListPageHeader>
      <RoomList rooms={rooms} />
    </PageContent>
  )
}

export default RoomListPage
