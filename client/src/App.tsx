import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { ROUTES } from "./utils/navigation"
import { ReduxProvider } from "./Redux"
import RoomPage from "./Room/RoomPage"

const ROOM_TEST_ID = "id_test"

const App = () => {
  return (
    <ReduxProvider>
      <Router>
        <Switch>
          <Route path={ROUTES.home()} exact>
            <Redirect to={ROUTES.room(ROOM_TEST_ID)} />
          </Route>
          <Route path={ROUTES.room(":roomId")}>
            <RoomPage />
          </Route>
        </Switch>
      </Router>
    </ReduxProvider>
  )
}

export default App
