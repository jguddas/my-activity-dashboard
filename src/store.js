import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import localforage from 'localforage'
import logger from 'redux-logger'

import Activity from './reducers/ActivityReducer.js'
import Segment from './reducers/SegmentReducer.js'
import Strava from './reducers/StravaReducer.js'

const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage: localforage,
  }, combineReducers({
    Activity,
    Segment,
    Strava,
  })),
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    logger,
  ],
})

export const persistor = persistStore(store)
export default store
