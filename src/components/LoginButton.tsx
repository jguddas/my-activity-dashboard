/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector, useDispatch } from '../store'

import { deauthorize } from '../actions/StravaActions'

import PageHeaderButton from './PageHeaderButton'

import getCode from '../utils/getCode'

function LoginButton():JSX.Element {
  const dispatch = useDispatch()
  const { athlete, accessToken } = useSelector((state) => state.Strava)

  const unAuth = () => accessToken && dispatch(deauthorize(accessToken))

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
