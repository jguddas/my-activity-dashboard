import { createReducer } from '@reduxjs/toolkit'
import {
  exchangeToken,
  refreshAuth,
  deauthorize,
} from '../actions/StravaActions'

type State = {
  accessToken?: string
  accessTokenExpiresAt?: number
  refreshToken?: string
  athlete?: {
    id: number
    username: null | string
    resource_state: number
    firstname: string
    lastname: string
    city: string
    state: string
    country: string
    sex: string
    premium: boolean
    summit: boolean
    created_at: string
    updated_at: string
    badge_type_id: number
    profile_medium: string
    profile: string
    friend: null
    follower: null
  }
}

const initialState = {} as State

export default createReducer(initialState, (builder) => (
  builder
    .addCase(exchangeToken.fulfilled, (state, action):State => ({
      ...state,
      accessToken: action.payload.access_token,
      accessTokenExpiresAt: action.payload.expires_at,
      refreshToken: action.payload.refresh_token,
      athlete: action.payload.athlete,
    }))
    .addCase(exchangeToken.rejected, ():State => ({}))
    .addCase(refreshAuth.fulfilled, (state, action):State => ({
      ...state,
      accessToken: action.payload.access_token,
      accessTokenExpiresAt: action.payload.expires_at,
      refreshToken: action.payload.refresh_token,
    }))
    .addCase(deauthorize.pending, ():State => ({}))
))
