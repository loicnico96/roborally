import React from "react"

import { BREADCRUMB_HOME } from "components/ui/Breadcrumb"
import PageContainer from "components/ui/PageContainer"
import PageHeader from "components/ui/PageHeader"
import { useTranslations } from "hooks/useTranslations"

import RoomListPage from "./RoomListPage"

const NAVIGATION_PARENTS = [BREADCRUMB_HOME]

const RoomListRoute = () => {
  const t = useTranslations()

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title={t.roomList.pageTitle} />
      <RoomListPage />
    </PageContainer>
  )
}

export default RoomListRoute
