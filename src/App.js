import React from 'react'
import dayjs from 'dayjs'
import { Provider } from 'react-redux'
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import { Error404Page } from 'tabler-react'

import ActivitiesPage from './components/Activities/ActivitiesPage.js'
import ActivityPage from './components/Activity/ActivityPage.js'

import store from './store.js'
import activities from './activities.js'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/activities/:month"
            render={({ match }) => (
              <ActivitiesPage
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
                <ActivityPage
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
      </BrowserRouter>
    </Provider>
  )
}

export default App
