import { useEffect } from "react"
import {
  ObjectId,
  ObjectState,
  getLoadingState,
  getErrorState,
  getLoadedState,
} from "../utils/ObjectState"
import useFirestore from "./useFirestore"
import { Collection, CollectionData } from "../common/functions/collections"

function useFirestoreLoader<T extends Collection>(
  collectionId: T,
  documentId: ObjectId,
  handler: (state: ObjectState<CollectionData<T>>) => void
) {
  const firestore = useFirestore()

  useEffect(() => {
    handler(getLoadingState(documentId))

    const subscription = firestore
      .collection(collectionId)
      .doc(documentId)
      .onSnapshot(
        snapshot => {
          const data = snapshot.data()
          if (data) {
            handler(getLoadedState(documentId, data as CollectionData<T>))
          } else {
            console.warn("This document does not exist or has been removed.")
            handler(getErrorState(documentId, Error("not-found")))
          }
        },
        error => {
          console.error(error.message)
          handler(getErrorState(documentId, error))
        }
      )

    return subscription
  }, [firestore, collectionId, documentId, handler])
}

export default useFirestoreLoader
