import { useCallback } from "react"

import { useAuthContext } from "firestore/auth/AuthContext"
import { promptUserName } from "firestore/auth/promptUserName"

import { useAsyncHandler } from "./useAsyncHandler"

export function useChangeName(): [() => Promise<void>, boolean] {
  const { userInfo } = useAuthContext()

  const isEnabled = userInfo !== null

  const [changeName, isLoading] = useAsyncHandler(
    useCallback(async () => {
      if (userInfo !== null) {
        const oldName = userInfo.name
        const newName = promptUserName(oldName)
        if (newName !== oldName) {
          await userInfo.updateName(newName)
        }
      }
    }, [userInfo])
  )

  return [changeName, isEnabled && !isLoading]
}
