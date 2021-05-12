import React from 'react'
import dayjs from 'dayjs'
import loadable from '@loadable/component'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { parse as parseQuery } from 'query-string'
import { useSelector, useDispatch } from '../store'

import PageWrapper from './PageWrapper'
import alert from '../utils/alert'

import { exchangeToken } from '../actions/StravaActions'

import { decode } from '../utils/trkptString'
import isShareQuery, { ShareQuery } from '../utils/isShareQuery'
import interpolateTrkpts from '../utils/interpolateTrkpts'

const fallback = <PageWrapper />

const LandingPage = loadable(() => import(
  /* webpackChunkName: "landing-page" */
  './LandingPage'
))
const Error404Page = loadable(() => import(
  /* webpackChunkName: "error-404-page" */
  './Error404Page'
))
const ActivitiesPage = loadable(() => import(
  /* webpackChunkName: "activities-page" */
  './ActivitiesPage'
), { fallback })
const ActivityPage = loadable(() => import(
  /* webpackChunkName: "activity-page" */
  './ActivityPage'
), { fallback })
const SplitsPage = loadable(() => import(
  /* webpackChunkName: "splits-page" */
  './SplitsPage'
), { fallback })
const SplitPage = loadable(() => import(
  /* webpackChunkName: "split-page" */
  './SplitPage'
), { fallback })
const SharedPage = loadable(() => import(
  /* webpackChunkName: "shared-page" */
  './SharedPage'
))

function Routes():JSX.Element {
  const athlete = useSelector((state) => state.Strava.athlete)
  const activities = useSelector((state) => state.Activity.activities)
  const splits = useSelector((state) => state.Split.splits)
  const dispatch = useDispatch()

  return (
    <Switch>
      <Route
        path="/exchange-token"
        render={({ location: { search } }:RouteComponentProps) => {
          const { code } = parseQuery(search)
          if (!code || typeof code !== 'string') return <Error404Page />
          dispatch(exchangeToken(code)).catch((err) => {
            if (err instanceof Error) {
              alert(err.message)
            }
          })
          return <Redirect to="/" />
        }}
      />
      <Route
        path="/share"
        render={({ location: { search } }:RouteComponentProps) => {
          const parsedQuery = parseQuery(search)
          if (!isShareQuery(parsedQuery)) return <Error404Page />
          const { track, sender, name } = parsedQuery as ShareQuery
          const [a, b, ...trkpts] = decode(track)
          return (
            <SharedPage
              factor={0.0005}
              activities={activities}
              shared={{ sender, name, a, b, trkpts: interpolateTrkpts(trkpts) }}
            />
          )
        }}
      />
      {!athlete && (
        <Route path="/">
          <LandingPage />
        </Route>
      )}
      <Route path="/splits" exact>
        <SplitsPage splits={splits} />
      </Route>
      <Route
        exact
        path="/matched-activities/:activityId"
        render={({ match }:RouteComponentProps<{activityId: string}>) => {
          const activity = activities.find(({ id }) => (
            id === decodeURI(match.params.activityId)
          ))
          if (!activity?.trkpts) {
            return (
              <Error404Page />
            )
          }
          return (
            <SplitPage
              activities={activities}
              activity={activity}
              split={{
                activity,
                name: 'Matched Activities',
                type: 'matched',
              }}
            />
          )
        }}
      />
      <Route
        path="/split/:splitId/:activityId?"
        render={({ match }:RouteComponentProps<{splitId:string, activityId?:string}>) => {
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
              activity={activity || undefined}
              split={split}
              factor={0.0005}
            />
          )
        }}
      />
      <Route
        exact
        path="/activities/:month"
        render={({ match }:RouteComponentProps<{month: string}>) => (
          <ActivitiesPage
            activities={activities}
            month={match.params.month}
          />
        )}
      />
      <Route
        exact
        path="/activity/:activityId"
        render={({ match }:RouteComponentProps<{activityId: string}>) => {
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
