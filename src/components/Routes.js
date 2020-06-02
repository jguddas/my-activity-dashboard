import React from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Error404Page } from 'tabler-react'
import {
  parse as parseQuery,
  stringify as stringifyQuery,
} from 'query-string'

import ActivitiesPage from './ActivitiesPage.js'
import ActivityPage from './ActivityPage.js'

import { addToken } from '../actions/StravaActions.js'

import {
  STRAVA_TOKEN_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
} from '../constants.js'

function Routes() {
  const activities = useSelector((state) => state.Activity.activities)
  const dispatch = useDispatch()

  return (
    <>
      <Route
        path="/exchange-token"
        render={({ location: { search } }) => {
          const { code } = parseQuery(search)
          if (!code) return null
          fetch(`${STRAVA_TOKEN_URL}?${stringifyQuery({
            code,
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            grant_type: 'authorization_code',
          })}`, { method: 'POST' })
            .then((res) => res.json())
            .then((res) => dispatch(addToken(res)))
          return null
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
    </>
  )
}

export default Routes
