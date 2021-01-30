import { createReducer } from '@reduxjs/toolkit'
import {
  exchangeToken,
  refreshAuth,
  deauthorize,
} from '../actions/StravaActions'

export default createReducer({}, {
  [exchangeToken.fulfilled]: (state, action) => ({
    ...state,
    accessToken: action.payload.access_token,
    accessTokenExpiresAt: action.payload.expires_at,
    refreshToken: action.payload.refresh_token,
    athlete: action.payload.athlete,
  }),
  [refreshAuth.rejected]: () => ({}),
  [refreshAuth.fulfilled]: (state, action) => ({
    ...state,
    accessToken: action.payload.access_token,
    accessTokenExpiresAt: action.payload.expires_at,
    refreshToken: action.payload.refresh_token,
  }),
  [deauthorize.pending]: () => ({}),
})
