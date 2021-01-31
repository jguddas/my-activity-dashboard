import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux'
import localforage from 'localforage'
import logger from 'redux-logger'

import Activity from './reducers/ActivityReducer'
import Split from './reducers/SplitReducer'
import Strava from './reducers/StravaReducer'

const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage: localforage,
  }, combineReducers({
    Activity,
    Split,
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

export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = useReduxDispatch

export const persistor = persistStore(store)
export default store
