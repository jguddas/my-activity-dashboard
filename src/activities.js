import dayjs from 'dayjs'

import getDistance from './getDistance.js'

function importAll(r) {
  const cache = []
  r.keys().forEach((key) => cache.push({ key, ...r(key) }))
  return cache
}

const activities = importAll(require.context('./activities', false, /\.json$/))

// const dayjs = require('dayjs')
// const requireDir = require('require-dir')
//
// const activities = Object.entries(requireDir('./activities'))
//   .map(([key, val]) => ({ key, ...val }))
//
// const getDistance = ([lat1, lon1], [lat2, lon2]) => {
//   function deg2rad(deg) {
//     return deg * (Math.PI / 180)
//   }
//   const R = 6371 // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1) // deg2rad below
//   const dLon = deg2rad(lon2 - lon1)
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
//     + Math.cos(deg2rad(lat1))
//       * Math.cos(deg2rad(lat2))
//       * Math.sin(dLon / 2)
//       * Math.sin(dLon / 2)
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   return R * c
// } // Distance in km

const mappedActivities = activities.map(({ gpx, key }) => {
  const endTime = gpx.trk.trkseg.trkpt[gpx.trk.trkseg.trkpt.length - 1].time
  const startTime = gpx.trk.trkseg.trkpt[0].time
  const distance = gpx.trk.trkseg.trkpt.reduce((acc, val) => ({
    sum: (acc.sum || 0) + getDistance([acc.lat, acc.lon], [val.lat, val.lon]),
    ...val,
  })).sum
  const trkpts = gpx.trk.trkseg.trkpt.map((pt) => [
    pt.lat,
    pt.lon,
    pt.ele,
    dayjs(pt.time).diff(startTime),
  ])

  return ({
    id: key.replace(/^.\//, '').replace(/\.\w*$/, ''),
    endTime,
    startTime,
    distance,
    name: gpx.trk.name,
    duration: dayjs(endTime).diff(startTime),
    date: dayjs(startTime).format('YYYY-MM-DD'),
    trkpts,
    startpt: trkpts[0],
    endpt: trkpts[trkpts.length - 1],
    speed: distance / (dayjs(endTime).diff(startTime) / 3600000),
  })
}).sort((a, b) => dayjs(b.startTime).diff(a.startTime))

// console.log(JSON.stringify(mappedActivities))
export default mappedActivities
