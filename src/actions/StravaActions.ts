import { createAsyncThunk } from '@reduxjs/toolkit'

import fetchWithQuery from '../utils/fetchWithQuery'

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

export const deauthorize = createAsyncThunk(
  'STRAVA_DEAUTHORIZE',
  (accessToken: string) => fetchWithQuery<undefined>(STRAVA_DEAUTHORIZATION_URL, {
    method: 'POST',
    query: { accessToken },
  }),
)

type RefreshAuth = {
  token_type: 'Bearer',
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
}
export const refreshAuth = createAsyncThunk(
  'STRAVA_REFRESH_AUTH',
  (refreshToken: string) => {
    if (!STRAVA_CLIENT_ID) return Promise.reject(new Error('missing STRAVA_CLIENT_ID'))
    if (!STRAVA_CLIENT_SECRET) return Promise.reject(new Error('missing STRAVA_CLIENT_SECRET'))
    return fetchWithQuery<RefreshAuth>(
      STRAVA_REFRESH_TOKEN_URL, {
        method: 'POST',
        query: {
          clientId: STRAVA_CLIENT_ID,
          clientSecret: STRAVA_CLIENT_SECRET,
          grantType: 'refresh_token',
          refreshToken,
        },
      },
    )
  },
)

const createAsyncThunkWithAuth = (type, payloadCreator) => createAsyncThunk(
  type,
  async (arg, thunkApi) => {
    const { Strava: state } = thunkApi.getState()
    if (!state.refreshToken) {
      return Promise.reject(new Error('user is not logged-in'))
    }
    if (state.accessTokenExpiresAt > Date.now() / 1000) {
      return payloadCreator(arg, state.accessToken, thunkApi)
    }
    const { payload, error } = await thunkApi.dispatch(refreshAuth(state.refreshToken))
    if (error) throw error
    return payloadCreator(arg, payload.access_token, thunkApi)
  },
)

const fetchWithAuth = (url, { headers, accessToken, ...opts }) => (
  fetchWithQuery(url, {
    ...opts,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
)

export const getActivities = createAsyncThunkWithAuth(
  'STRAVA_GET_ACTIVITIES',
  (query, accessToken, { rejectWithValue }) => fetchWithAuth(
    STRAVA_ACTIVITIES_URL,
    { query, accessToken },
  ).catch(rejectWithValue),
)

export const getActivityStream = createAsyncThunkWithAuth(
  'STRAVA_GET_ACTIVITY_STREAM',
  ({ id, ...query }, accessToken) => fetchWithAuth(
    STRAVA_ACTIVITY_STREAM_URL.replace('%s', id),
    { query, accessToken },
  ),
)

export const getStarredSegments = createAsyncThunkWithAuth(
  'STRAVA_GET_STARRED_SEGMENTS',
  (query, accessToken, { rejectWithValue }) => fetchWithAuth(
    STRAVA_STARRED_SEGMENTS_URL,
    { query, accessToken },
  ).catch(rejectWithValue),
)

window.getStarredSegments = getStarredSegments

export const exchangeToken = createAsyncThunk(
  'STRAVA_EXCHANGE_TOKEN',
  (code) => fetchWithQuery(STRAVA_TOKEN_URL, {
    method: 'POST',
    query: {
      code,
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: 'authorization_code',
    },
  }),
)
