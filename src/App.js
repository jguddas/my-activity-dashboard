import React from 'react'
import dayjs from 'dayjs'
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom'

import ArctivitiesPage from './components/Activities/ActivitiesPage.js'

import activities from './activities.js'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path="/activities/:month"
          render={({ match }) => (
            <ArctivitiesPage
              activities={activities}
              month={match.params.month}
            />
          )}
        />
        <Redirect
          to={`/activities/${dayjs(activities[0].date).format('YYYY-MM')}`}
        />
      </Switch>
    </HashRouter>
  )
}

export default App
