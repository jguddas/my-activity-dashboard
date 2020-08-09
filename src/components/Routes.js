import React from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Error404Page } from 'tabler-react'
import { parse as parseQuery } from 'query-string'

import ActivitiesPage from './ActivitiesPage.js'
import ActivityPage from './ActivityPage.js'
import SegmentsPage from './SegmentsPage.js'

import { exchangeToken } from '../actions/StravaActions.js'

function Routes() {
  const activities = useSelector((state) => state.Activity.activities)
  const dispatch = useDispatch()

  return (
    <Switch>
      <Route path="/segments">
        <SegmentsPage />
      </Route>
      <Route
        path="/exchange-token"
        render={({ location: { search } }) => {
          const { code } = parseQuery(search)
          if (!code) return null
          dispatch(exchangeToken(code))
          return <Redirect to="/" />
        }}
      />
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
        to={`/activities/${dayjs(activities[0]?.date).format('YYYY-MM')}`}
      />
    </Switch>
  )
}

export default Routes
