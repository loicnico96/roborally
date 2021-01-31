import { useEffect } from "react"

import {
  Resource,
  getLoadingResource,
  getErrorResource,
  getLoadedResource,
} from "utils/resources"

import { DocumentData, DocumentRef } from "./types"

export function useFirestoreLoader<T extends DocumentData>(
  documentRef: DocumentRef<T>,
  handler: (state: Resource<T>) => any
) {
  useEffect(() => {
    const documentId = documentRef.id

    handler(getLoadingResource(documentId))

    const subscription = documentRef.onSnapshot(
      snapshot => {
        const data = snapshot.data()
        if (data) {
          handler(getLoadedResource(documentId, data))
        } else {
          handler(getErrorResource(documentId, Error("not-found")))
        }
      },
      error => {
        console.error(error.message)
        handler(getErrorResource(documentId, error))
      }
    )

    return subscription
  }, [documentRef, handler])
}
