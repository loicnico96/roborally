import { useCallback } from "react"

import { useAuthContext } from "firestore/auth/AuthContext"
import { promptUserName } from "firestore/auth/promptUserName"

export function useChangeName(): [() => Promise<void>, boolean] {
  const { userInfo } = useAuthContext()

  const isEnabled = userInfo !== null

  const changeName = useCallback(async () => {
    if (userInfo !== null) {
      const oldName = userInfo.name
      try {
        const newName = promptUserName(oldName)
        if (newName !== oldName) {
          await userInfo.updateName(newName)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [userInfo])

  return [changeName, isEnabled]
}
