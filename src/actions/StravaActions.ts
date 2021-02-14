import { createAsyncThunk } from '@reduxjs/toolkit'

import fetchWithQuery, { RequestInitWithQuery, Query } from '../utils/fetchWithQuery'
import { RootState, AppDispatch } from '../store'

import {
  STRAVA_TOKEN_URL,
  STRAVA_REFRESH_TOKEN_URL,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_ACTIVITIES_URL,
  STRAVA_ACTIVITY_STREAM_URL,
  STRAVA_STARRED_SEGMENTS_URL,
  STRAVA_DEAUTHORIZATION_URL,
} from '../constants'

import { Auth, Athlete, Activities, Segments } from '../types/strava'

export const deauthorize = createAsyncThunk(
  'STRAVA_DEAUTHORIZE',
  (accessToken: string) => {
    const query:Auth.Deauthorization.RequestQuery = { accessToken }
    return fetchWithQuery<Auth.Deauthorization.ResponseBody>(
      STRAVA_DEAUTHORIZATION_URL,
      { method: 'POST', query },
    )
  },
)

export const refreshAuth = createAsyncThunk(
  'STRAVA_REFRESH_AUTH',
  (refreshToken: string) => {
    if (!STRAVA_CLIENT_ID) return Promise.reject(new Error('missing STRAVA_CLIENT_ID'))
    if (!STRAVA_CLIENT_SECRET) return Promise.reject(new Error('missing STRAVA_CLIENT_SECRET'))
    const query:Auth.RefreshToken.RequestQuery = {
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      grantType: 'refresh_token',
      refreshToken,
    }
    return fetchWithQuery<Auth.RefreshToken.ResponseBody>(
      STRAVA_REFRESH_TOKEN_URL,
      { method: 'POST', query },
    )
  },
)

const createAsyncThunkWithAuth = <U, T>(
  type: string,
  payloadCreator: (arg: T, accessToken: string) => U,
) => (
    createAsyncThunk<U, T, { state: RootState, dispatch: AppDispatch }>(
      type,
      async (arg, thunkApi) => {
        const { Strava: state } = thunkApi.getState()
        if (!state.refreshToken) {
          return Promise.reject(new Error('user is not logged-in'))
        }
        if (
          state.accessToken
          && state.accessTokenExpiresAt
          && state.accessTokenExpiresAt > Date.now() / 1000
        ) {
          return payloadCreator(arg, state.accessToken)
        }
        const actionResult = await thunkApi.dispatch(refreshAuth(state.refreshToken))
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if ('error' in actionResult) throw actionResult.error
        return payloadCreator(arg, actionResult.payload.access_token)
      },
    )
  )

interface RequestInitWithAuth extends RequestInitWithQuery {
  accessToken: string
}

const fetchWithAuth = <T>(url: string, { accessToken, ...opts }: RequestInitWithAuth) => (
  fetchWithQuery<T>(url, {
    ...opts,
    headers: {
      ...opts.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
)

export const getActivities = createAsyncThunkWithAuth(
  'STRAVA_GET_ACTIVITIES',
  (query: Athlete.GetLoggedInAthleteActivities.RequestQuery, accessToken) => (
    fetchWithAuth<Athlete.GetLoggedInAthleteActivities.ResponseBody>(
      STRAVA_ACTIVITIES_URL,
      { query: query as Query, accessToken },
    )
  ),
)

export const getActivityStream = createAsyncThunkWithAuth(
  'STRAVA_GET_ACTIVITY_STREAM',
  (
    arg: Activities.GetActivityStreams.RequestParams & Activities.GetActivityStreams.RequestQuery,
    accessToken,
  ) => {
    const { id }: Activities.GetActivityStreams.RequestParams = arg
    const query:Query = { keys: arg.keys, keyByType: arg.keyByType }
    fetchWithAuth<Activities.GetActivityStreams.ResponseBody>(
      STRAVA_ACTIVITY_STREAM_URL.replace('%s', id),
      { query, accessToken },
    )
  },
)

export const getStarredSegments = createAsyncThunkWithAuth(
  'STRAVA_GET_STARRED_SEGMENTS',
  (query: Segments.GetLoggedInAthleteStarredSegments.RequestQuery, accessToken) => (
    fetchWithAuth<Segments.GetLoggedInAthleteStarredSegments.ResponseBody>(
      STRAVA_STARRED_SEGMENTS_URL,
      { query: query as Query, accessToken },
    )
  ),
)

export const exchangeToken = createAsyncThunk(
  'STRAVA_EXCHANGE_TOKEN',
  (code: string) => {
    if (!STRAVA_CLIENT_ID) return Promise.reject(new Error('missing STRAVA_CLIENT_ID'))
    if (!STRAVA_CLIENT_SECRET) return Promise.reject(new Error('missing STRAVA_CLIENT_SECRET'))
    const query: Auth.ExchangeToken.RequestQuery = {
      code,
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      grantType: 'authorization_code',
    }
    return fetchWithQuery<Auth.ExchangeToken.ResponseBody>(
      STRAVA_TOKEN_URL,
      { method: 'POST', query },
    )
  },
)
