import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import HomeRoute from "components/home/HomeRoute"
import LoginRoute from "components/login/LoginRoute"
import RoomRoute from "components/room/RoomRoute"
import RoomListRoute from "components/roomList/RoomListRoute"
import ToastProvider from "components/ui/ToastProvider"
import TranslationProvider from "components/ui/TranslationProvider"
import AuthProvider from "firestore/auth/AuthProvider"
import { ROUTES } from "utils/navigation"

function App() {
  return (
    <TranslationProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={ROUTES.home()}>
                <HomeRoute />
              </Route>
              <Route exact path={ROUTES.login()}>
                <LoginRoute />
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
      </ToastProvider>
    </TranslationProvider>
  )
}

export default App
