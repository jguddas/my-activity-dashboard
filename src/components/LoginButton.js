/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deauthorize } from '../actions/StravaActions.js'

import PageHeaderButton from './PageHeaderButton.js'

import getCode from '../utils/getCode.js'

function LoginButton() {
  const dispatch = useDispatch()
  const { athlete, accessToken } = useSelector((state) => state.Strava)

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
