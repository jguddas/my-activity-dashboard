import React from 'react'
import dayjs from 'dayjs'
import loadable from '@loadable/component'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Error404Page } from 'tabler-react'
import { parse as parseQuery } from 'query-string'

import PageWrapper from './PageWrapper.js'

import { exchangeToken } from '../actions/StravaActions.js'

const fallback = () => <PageWrapper />

const ActivitiesPage = loadable(() => import(
  /* webpackChunkName: "activities-page" */
  './ActivitiesPage.js'
), { fallback })
const ActivityPage = loadable(() => import(
  /* webpackChunkName: "activity-page" */
  './ActivityPage.js'
), { fallback })
const SplitsPage = loadable(() => import(
  /* webpackChunkName: "splits-page" */
  './SplitsPage.js'
), { fallback })
const SplitPage = loadable(() => import(
  /* webpackChunkName: "split-page" */
  './SplitPage.js'
), { fallback })

function Routes() {
  const activities = useSelector((state) => state.Activity.activities)
  const splits = useSelector((state) => state.Split.splits)
  const dispatch = useDispatch()

  return (
    <Switch>
      <Route path="/splits" exact>
        <SplitsPage splits={splits} />
      </Route>
      <Route
        exact
        path="/matched-activities/:activityId"
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
            <SplitPage
              activities={activities}
              activity={activity}
              splits={splits}
              split={{
                ...activity,
                name: 'Matched Activities',
                type: 'matched',
              }}
            />
          )
        }}
      />
      <Route
        path="/split/:splitId/:activityId?"
        render={({ match }) => {
          const { splitId, activityId } = match.params
          const split = splitId ? splits.find(({ id }) => (
            `${id}` === decodeURI(splitId)
          )) : null
          const activity = activityId ? activities.find(({ id }) => (
            `${id}` === decodeURI(activityId)
          )) : null
          if (!split || (activityId && !activity)) {
            return (
              <Error404Page />
            )
          }
          return (
            <SplitPage
              activities={activities}
              activity={activity}
              splits={splits}
              split={split}
              factor={0.0005}
            />
          )
        }}
      />
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
