import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/index.js'
import logger from 'redux-logger'

import rootReducer from './reducers/index.js'

const persistConfig = { key: 'root', storage }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(logger))

export const persistor = persistStore(store)
export default store
