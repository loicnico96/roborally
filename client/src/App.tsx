import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { ROUTES } from "./utils/navigation"
import RoomRoute from "./components/RoomRoute"
import RoomListRoute from "./components/rooms/RoomListRoute"

const ROOM_TEST_ID = "id_test"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.home()}>
          <Redirect to={ROUTES.room(ROOM_TEST_ID)} />
        </Route>
        <Route exact path={ROUTES.roomList()}>
          <RoomListRoute />
        </Route>
        <Route path={ROUTES.room(":roomId")}>
          <RoomRoute />
        </Route>
        <Redirect to={ROUTES.roomList()} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
