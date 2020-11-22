import React from "react"
import { useAuthContext } from "firestore/auth/AuthContext"
import { useSignInAnonymous } from "firestore/auth/useSignInAnonymous"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { Link } from "react-router-dom"
import { ROUTES } from "utils/navigation"
import PageHeader from "./PageHeader"

const HomeRoute = () => {
  const { isAuthenticated, userId, userInfo } = useAuthContext()
  const [signInAnonymous, isLoading] = useAsyncHandler(useSignInAnonymous())

  return (
    <div>
      <PageHeader title="HOME" />
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
