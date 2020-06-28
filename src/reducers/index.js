import { combineReducers } from 'redux'

import Activity from './ActivityReducer.js'
import Segment from './SegmentReducer.js'
import Strava from './StravaReducer.js'

export default combineReducers({ Activity, Segment, Strava })
