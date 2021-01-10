import React, { useState } from "react"

import { Collection } from "common/firestore/collections"
import { RoomData } from "common/model/RoomData"
import { SortDirection } from "common/utils/arrays"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import { renderError } from "components/ui/PageError"
import PageHeader from "components/ui/PageHeader"
import { renderLoader } from "components/ui/PageLoader"
import { useCollectionLoader } from "firestore/useCollectionLoader"
import { ROUTES } from "utils/navigation"
import {
  Resource,
  isLoading,
  isError,
  getLoadingResource,
  LoadedResource,
} from "utils/resources"

import RoomListPage from "./RoomListPage"

const NAVIGATION_PARENTS = [{ title: "HOME", path: ROUTES.home() }]

const RoomListRoute = () => {
  const [roomsResource, setRoomsResource] = useState<
    Resource<LoadedResource<RoomData>[]>
  >(getLoadingResource(Collection.ROOM))

  useCollectionLoader(Collection.ROOM, setRoomsResource, {
    sortDirection: SortDirection.DESC,
    sortField: "createdAt",
  })

  return (
    <PageContainer>
      <PageHeader parents={NAVIGATION_PARENTS} title="ROOMS" />
      <PageContent>
        {isLoading(roomsResource) ? (
          renderLoader("Loading rooms...")
        ) : isError(roomsResource) ? (
          renderError(roomsResource.error)
        ) : (
          <RoomListPage rooms={roomsResource.data} />
        )}
      </PageContent>
    </PageContainer>
  )
}

export default RoomListRoute
