import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'

import Routes from './Routes.js'

import store from './store.js'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
