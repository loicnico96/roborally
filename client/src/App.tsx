import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { ROUTES } from "./utils/navigation"
import RoomRoute from "./components/RoomRoute"
import RoomListRoute from "./components/rooms/RoomListRoute"
import AuthProvider from "./firestore/auth/AuthProvider"
import HomeRoute from "components/HomeRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.home()}>
            <HomeRoute />
          </Route>
          <Route exact path={ROUTES.roomList()}>
            <RoomListRoute />
          </Route>
          <Route path={ROUTES.room(":roomId")}>
            <RoomRoute />
          </Route>
          <Redirect to={ROUTES.home()} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
