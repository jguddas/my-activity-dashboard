import { createReducer } from '@reduxjs/toolkit'
import { addToken, deauthorize } from '../actions/StravaActions.js'

export default createReducer({}, {
  [addToken]: (state, action) => ({
    ...state,
    accessToken: action.payload.access_token,
    athlete: action.payload.athlete,
  }),
  [deauthorize]: () => ({}),
})
