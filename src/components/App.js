import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react.js'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes.js'

import store, { persistor } from '../store.js'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
