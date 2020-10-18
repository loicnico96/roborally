import { useEffect } from 'react'
import { DocumentData, Collection } from './types'
import {
  ObjectId,
  ObjectState,
  getLoadingState,
  getErrorState,
  getLoadedState,
} from '../utils/ObjectState'
import useFirestore from './useFirestore'

function useFirestoreLoader<T extends DocumentData>(
  collectionId: Collection,
  documentId: ObjectId,
  handler: (state: ObjectState<T>) => void
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
            handler(getLoadedState(documentId, data as T))
          } else {
            console.warn('This document does not exist or has been removed.')
            handler(getErrorState(documentId, Error('not-found')))
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
