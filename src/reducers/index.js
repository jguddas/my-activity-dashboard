import { combineReducers } from 'redux'

import Activity from './ActivityReducer.js'
import Strava from './StravaReducer.js'

export default combineReducers({ Activity, Strava })
