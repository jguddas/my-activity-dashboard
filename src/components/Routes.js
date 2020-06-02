import React from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Error404Page } from 'tabler-react'

import ActivitiesPage from './Activities/ActivitiesPage.js'
import ActivityPage from './Activity/ActivityPage.js'

function Routes() {
  const activities = useSelector((state) => state.Activity.activities)

  return (
    <>
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
