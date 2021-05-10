import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import Error301Page from './Error301Page'

import { REDIRECT_HOSTNAME } from '../constants'
import store, { persistor } from '../store'

function App():JSX.Element {
  if (REDIRECT_HOSTNAME && REDIRECT_HOSTNAME !== window.location.hostname) {
    return (
      <Error301Page
        newLocation={`https://${REDIRECT_HOSTNAME}`}
      />
    )
  }

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
