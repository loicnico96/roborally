import React from 'react'
import {ROUTES} from './routes'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import RoomPage from './RoomPage'

const ROOM_TEST_ID = 'id_test'

const App = () => {
  return (
    <Router>
      <Route path={ROUTES.home()}>
        <Redirect to={ROUTES.room(ROOM_TEST_ID)} />
      </Route>
      <Route path={ROUTES.room(':room_id')}>
        <RoomPage />
      </Route>
    </Router>
  )
}

export default App
