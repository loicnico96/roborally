import { useMemo } from "react"

import { SortDirection } from "common/utils/arrays"

import { CollectionRef, DocumentData, Query } from "./types"

export type QueryFilter = {
  field: string
  value: string | number | boolean | null
}

export type QueryOptions = {
  filters?: QueryFilter[]
  sortDirection: SortDirection
  sortField: string
}

export function filterQuery<T extends DocumentData>(
  query: Query<T>,
  filters: QueryFilter[]
): Query<T> {
  return filters.reduce(
    (result, filter) => result.where(filter.field, "==", filter.value),
    query
  )
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
  const { filters, sortDirection, sortField } = options

  return useMemo(() => {
    let query: Query<T> = collectionRef

    if (filters) {
      query = filterQuery(query, filters)
    }

    query = sortQuery(query, sortField, sortDirection)

    return query
  }, [collectionRef, filters, sortDirection, sortField])
}
