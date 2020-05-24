import React from 'react'
import dayjs from 'dayjs'
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import { Error404Page } from 'tabler-react'

import ArctivitiesPage from './components/Activities/ActivitiesPage.js'
import ArctivityPage from './components/Activity/ActivityPage.js'

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
        <Route
          exact
          path="/activity/:activityId"
          render={({ match }) => {
            const activity = activities.find(({ id }) => (
              id === decodeURI(match.params.activityId)
            ))
            if (!activity) {
              return (
                <Error404Page />
              )
            }
            return (
              <ArctivityPage
                activity={activity}
                activities={activities}
              />
            )
          }}
        />
        <Redirect
          to={`/activities/${dayjs(activities[0].date).format('YYYY-MM')}`}
        />
      </Switch>
    </HashRouter>
  )
}

export default App
