export const STRAVA_ADD_TOKEN = 'STRAVA_ADD_TOKEN'
export const STRAVA_DEAUTHORIZE = 'STRAVA_DEAUTHORIZE'

export const addToken = (payload) => ({ type: STRAVA_ADD_TOKEN, payload })
export const deauthorize = (payload) => ({ type: STRAVA_DEAUTHORIZE, payload })
