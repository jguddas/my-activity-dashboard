/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stringify as stringifyQuery } from 'query-string'

import { deauthorize } from '../actions/StravaActions.js'

import PageHeaderButton from './PageHeaderButton.js'

import {
  STRAVA_SCOPE,
  STRAVA_CLIENT_ID,
  STRAVA_OAUTH_URL,
} from '../constants.js'

function LoginButton() {
  const dispatch = useDispatch()
  const { athlete, accessToken } = useSelector((state) => state.Strava)

  const getCode = () => {
    window.open(`${STRAVA_OAUTH_URL}?${stringifyQuery({
      client_id: STRAVA_CLIENT_ID,
      response_type: 'code',
      redirect_uri: `${window.location.origin}/exchange-token`,
      scope: STRAVA_SCOPE,
    })}`, '_self')
  }

  const unAuth = () => dispatch(deauthorize(accessToken))

  return (
    <PageHeaderButton
      icon={athlete ? 'log-out' : 'log-in'}
      onClick={athlete ? unAuth : getCode}
    >
      {athlete ? `Logout (${athlete.firstname} ${athlete.lastname})` : 'Login'}
    </PageHeaderButton>
  )
}

export default LoginButton
