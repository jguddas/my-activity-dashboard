import { createReducer } from '@reduxjs/toolkit'
import {
  addToken,
  refreshAuth,
  deauthorize,
} from '../actions/StravaActions.js'

export default createReducer({}, {
  [addToken]: (state, action) => ({
    ...state,
    accessToken: action.payload.access_token,
    accessTokenExpiresAt: action.payload.expires_at,
    refreshToken: action.payload.refresh_token,
    athlete: action.payload.athlete,
  }),
  [refreshAuth.rejected]: () => ({}),
  [deauthorize]: () => ({}),
})
