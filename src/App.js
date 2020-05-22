import React from 'react'
import './App.css'

import ActivityMap from './components/Activity/ActivityMap.js'

import { gpx } from './gpx.json'

function App() {
  return (
    <div className="App">
      <ActivityMap
        cords={gpx.trk.trkseg.trkpt.map((pt) => [pt.lat, pt.lon])}
      />
    </div>
  )
}

export default App
