import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"

import { GameType } from "common/GameSettings"
import { RoomData } from "common/model/RoomData"
import AsyncButton from "components/ui/AsyncButton"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomCreate } from "functions/triggers"
import { ROUTES } from "utils/navigation"
import { LoadedResource } from "utils/resources"

import RoomList from "./RoomList"

const NAVIGATION_PARENTS = [{ title: "HOME", path: ROUTES.home() }]

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

const RoomListPage = ({ rooms }: RoomListPageProps) => {
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title="ROOMS" />
      <PageContent>
        <div id="RoomListPageHeader">
          <AsyncButton onClick={createRoom} disabled={!isCreateRoomEnabled}>
            Create room
          </AsyncButton>
        </div>
        <RoomList rooms={rooms} />
      </PageContent>
    </PageContainer>
  )
}

export default RoomListPage
