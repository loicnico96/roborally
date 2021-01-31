import { useMemo } from "react"

import { SortDirection } from "common/utils/arrays"

import { CollectionRef, DocumentData, Query } from "./types"

export type QueryOptions = {
  sortDirection: SortDirection
  sortField: string
}

export function sortQuery<T extends DocumentData>(
  query: Query<T>,
  sortField: string,
  sortDirection: SortDirection
): Query<T> {
  const directionStr = sortDirection === SortDirection.DESC ? "desc" : "asc"
  return query.orderBy(sortField, directionStr)
}

export function useQuery<T extends DocumentData>(
  collectionRef: CollectionRef<T>,
  options: QueryOptions
): Query<T> {
  const { sortDirection, sortField } = options

  return useMemo(() => {
    let query: Query<T> = collectionRef

    query = sortQuery(query, sortField, sortDirection)

    return query
  }, [collectionRef, sortDirection, sortField])
}
