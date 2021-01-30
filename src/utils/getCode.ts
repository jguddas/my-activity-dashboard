import { stringify as stringifyQuery } from 'query-string'

import {
  STRAVA_SCOPE,
  STRAVA_CLIENT_ID,
  STRAVA_OAUTH_URL,
} from '../constants'

const getCode = () => {
  window.open(`${STRAVA_OAUTH_URL}?${stringifyQuery({
    client_id: STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: `${window.location.origin}/exchange-token`,
    scope: STRAVA_SCOPE,
  })}`, '_self')
}

export default getCode
