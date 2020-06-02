/* eslint-disable no-nested-ternary */
import { STRAVA_ADD_TOKEN, STRAVA_DEAUTHORIZE } from '../actions/StravaActions.js'

export default (state, action) => (state ? (
  action.type === STRAVA_ADD_TOKEN ? {
    ...state,
    accessToken: action.payload.access_token,
    athlete: action.payload.athlete,
  } : action.type === STRAVA_DEAUTHORIZE
    ? {}
    : state
) : {})
