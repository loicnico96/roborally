import React from "react"
import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { Link } from "react-router-dom"
import { ROUTES } from "utils/navigation"

const HomeRoute = () => {
  const { isAuthenticated, userId, userInfo } = useAuthContext()
  const [signInAnonymous, isLoading] = useAsyncHandler(useSignInAnonymous())

  // const history = useHistory()
  // const openRoomList = useCallback(() => {
  //   history.push(ROUTES.roomList())
  // }, [history])

  return (
    <div>
      <div>
        <Link to={ROUTES.roomList()}>Open rooms</Link>
      </div>
      {isAuthenticated && userId !== null && userInfo !== null ? (
        <div>
          Signed in as {userId} : {JSON.stringify(userInfo)}
        </div>
      ) : (
        <button onClick={signInAnonymous} disabled={isLoading}>
          Sign in as guest
        </button>
      )}
    </div>
  )
}

export default HomeRoute
