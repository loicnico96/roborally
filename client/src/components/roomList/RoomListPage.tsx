import React, { useCallback } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import { GameType } from "common/GameSettings"
import { RoomData, RoomId } from "common/model/RoomData"
import PageHeader from "components/PageHeader"
import AsyncButton from "components/primitives/AsyncButton"
import { useAuthContext } from "firestore/auth/AuthContext"
import { triggerRoomCreate } from "functions/triggers"
import { useTrans } from "hooks/useTrans"
import { ROUTES } from "utils/navigation"

import RoomList from "./RoomList"

export type RoomListPageProps = {
  rooms: Record<RoomId, RoomData>
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

const RoomListPageContentContainer = styled.div`
  background-color: #eee;
  padding: 24px 48px;
`

const RoomListPage = ({ rooms }: RoomListPageProps) => {
  const [createRoom, isCreateRoomEnabled] = useCreateRoom()
  const t = useTrans("RoomListPage")

  return (
    <div id="RoomListPageContainer">
      <PageHeader title={t("pageTitle")} />
      <RoomListPageContentContainer id="RoomListPageContentContainer">
        <div id="RoomListPageHeader">
          <AsyncButton onClick={createRoom} disabled={!isCreateRoomEnabled}>
            {t("createRoomButton")}
          </AsyncButton>
        </div>
        <RoomList rooms={rooms} />
      </RoomListPageContentContainer>
    </div>
  )
}

export default RoomListPage
