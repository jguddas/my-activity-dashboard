import React from 'react'

import ActivityCard from './components/Activity/ActivityCard.js'

import activities from './activities.js'

function App() {
  return (
    <div style={{ margin: 5 }}>
      <ActivityCard activity={activities[0]} />
    </div>
  )
}

export default App
