import { useState, useEffect } from 'react'
import firebase from '../firebase'

export type CollectionId = 'room' | 'game' | 'board'

export type DocumentData = firebase.firestore.DocumentData

type ResourcePending = {
  status: 'pending'
  data: null
}

type ResourceError = {
  status: 'error'
  data: Error
}

type ResourceDone<T extends DocumentData> = {
  status: 'done'
  data: T
}

type Resource<T extends DocumentData> =
  | ResourceDone<T>
  | ResourcePending
  | ResourceError

const firestore = firebase.firestore()

export const useFirestore = <T extends DocumentData = DocumentData>(
  col_id: CollectionId,
  doc_id: string
): Resource<T> => {
  const [result, set_result] = useState({
    status: 'pending',
    data: null,
  } as Resource<T>)

  useEffect(() => {
    set_result({
      status: 'pending',
      data: null,
    })

    const subscription = firestore
      .collection(col_id)
      .doc(doc_id)
      .onSnapshot(
        snapshot => {
          const data = snapshot.data()
          if (data) {
            set_result({
              status: 'done',
              data: data as T,
            })
          } else {
            console.warn(
              'The requested document does not exist or has been removed.'
            )
            set_result({
              status: 'error',
              data: Error('not-found'),
            })
          }
        },
        error => {
          console.warn(error.message)
          set_result({
            status: 'error',
            data: error,
          })
        }
      )

    return subscription
  }, [set_result, col_id, doc_id])

  return result
}
