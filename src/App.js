import React from 'react'

import ArctivitiesPage from './components/Activities/ActivitiesPage.js'

import activities from './activities.js'

function App() {
  return (
    <ArctivitiesPage activities={activities} />
  )
}

export default App
