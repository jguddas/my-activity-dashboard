import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import localforage from 'localforage'
import logger from 'redux-logger'

import rootReducer from './reducers/index.js'

const persistConfig = { key: 'root', storage: localforage }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(logger))

export const persistor = persistStore(store)
export default store
