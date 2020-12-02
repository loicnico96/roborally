import { useMemo } from "react"

import { Collection } from "common/firestore/collections"
import { SortDirection } from "common/utils/arrays"

import { Query } from "./types"
import { useFirestore } from "./useFirestore"

export type QueryOptions = {
  sortDirection: SortDirection
  sortField: string
}

export function sortQuery(
  query: Query,
  sortField: string,
  sortDirection: SortDirection
): Query {
  const directionStr = sortDirection === SortDirection.DESC ? "desc" : "asc"
  return query.orderBy(sortField, directionStr)
}

export function useQuery(
  collectionId: Collection,
  options: QueryOptions
): Query {
  const firestore = useFirestore()

  const { sortDirection, sortField } = options

  return useMemo(() => {
    let query: Query = firestore.collection(collectionId)

    query = sortQuery(query, sortField, sortDirection)

    return query
  }, [collectionId, firestore, sortDirection, sortField])
}
