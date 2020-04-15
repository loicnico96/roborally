import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ROUTES } from './utils/navigation'
import Room from './Room'

const ROOM_TEST_ID = 'id_test'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.home()} exact>
          <Redirect to={ROUTES.room(ROOM_TEST_ID)} />
        </Route>
        <Route path={ROUTES.room(':room_id')}>
          <Room />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
