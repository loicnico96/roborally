import { useCallback } from "react"

import { useAuthContext } from "firestore/auth/AuthContext"

export function useChangeName(): [() => Promise<void>, boolean] {
  const { userInfo } = useAuthContext()

  const isEnabled = userInfo !== null

  const changeName = useCallback(async () => {
    if (userInfo !== null) {
      const oldName = userInfo.name
      // eslint-disable-next-line no-alert
      const newName = window.prompt("Choose your user name", oldName)
      if (newName !== null && newName !== "" && newName !== oldName) {
        try {
          await userInfo.updateName(newName)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }, [userInfo])

  return [changeName, isEnabled]
}
