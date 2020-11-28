import { useEffect } from "react"

import { Collection, CollectionData } from "common/firestore/collections"
import {
  Resource,
  ResourceId,
  getLoadingResource,
  getErrorResource,
  getLoadedResource,
} from "utils/resources"

import { useFirestore } from "./useFirestore"

export function useFirestoreLoader<T extends Collection>(
  collectionId: T,
  documentId: ResourceId,
  handler: (state: Resource<CollectionData<T>>) => any
) {
  const firestore = useFirestore()

  useEffect(() => {
    handler(getLoadingResource(documentId))

    const subscription = firestore
      .collection(collectionId)
      .doc(documentId)
      .onSnapshot(
        snapshot => {
          const data = snapshot.data()
          if (data) {
            // TODO: Validation?
            handler(getLoadedResource(documentId, data as CollectionData<T>))
          } else {
            // TODO: Remove
            console.warn("This document does not exist or has been removed.")
            handler(getErrorResource(documentId, Error("not-found")))
          }
        },
        error => {
          console.error(error.message)
          handler(getErrorResource(documentId, error))
        }
      )

    return subscription
  }, [firestore, collectionId, documentId, handler])
}
