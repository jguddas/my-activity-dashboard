/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'tabler-react'
import { stringify as stringifyQuery } from 'query-string'

import { deauthorize } from '../actions/StravaActions.js'

import {
  STRAVA_SCOPE,
  STRAVA_CLIENT_ID,
  STRAVA_OAUTH_URL,
  STRAVA_DEAUTHORIZATION_URL,
} from '../constants.js'

function LoginButton(props) {
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

  const unAuth = () => {
    fetch(`${STRAVA_DEAUTHORIZATION_URL}?${stringifyQuery({
      access_token: accessToken,
    })}`, { method: 'POST' })
      .then((res) => res.json())
      .then((res) => dispatch(deauthorize(res)))
      .catch((err) => dispatch(deauthorize({ err })))
  }

  return (
    <Button
      prefix="fe"
      icon={athlete ? 'log-out' : 'log-in'}
      color="secondary"
      {...props}
      onClick={athlete ? unAuth : getCode}
    >
      {athlete ? `Logout (${athlete.firstname} ${athlete.lastname})` : 'Login'}
    </Button>
  )
}

export default LoginButton
