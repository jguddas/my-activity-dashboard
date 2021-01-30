/* eslint-disable prefer-destructuring */
export const STRAVA_OAUTH_URL = 'https://www.strava.com/oauth/authorize'
export const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token'
export const STRAVA_REFRESH_TOKEN_URL = 'https://www.strava.com/api/v3/oauth/token'
export const STRAVA_DEAUTHORIZATION_URL = 'https://www.strava.com/oauth/deauthorize'
export const STRAVA_ACTIVITIES_URL = 'https://www.strava.com/api/v3/athlete/activities'
export const STRAVA_ACTIVITY_STREAM_URL = 'https://www.strava.com/api/v3/activities/%s/streams'
export const STRAVA_STARRED_SEGMENTS_URL = 'https://www.strava.com/api/v3/segments/starred'
export const STRAVA_SCOPE = 'read,activity:read_all'
export const STRAVA_CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID
export const STRAVA_CLIENT_SECRET = process.env.REACT_APP_STRAVA_CLIENT_SECRET
export const RESAMPLE_SCALE = 0.5
