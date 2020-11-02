import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { ROUTES } from "./utils/navigation"
import RoomPage from "./components/RoomPage"

const ROOM_TEST_ID = "id_test"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.home()} exact>
          <Redirect to={ROUTES.room(ROOM_TEST_ID)} />
        </Route>
        <Route path={ROUTES.room(":roomId")}>
          <RoomPage />
        </Route>
        <Redirect to={ROUTES.home()} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
