import dayjs from 'dayjs'

function importAll(r) {
  const cache = []
  r.keys().forEach((key) => cache.push(r(key)))
  return cache
}

const activities = importAll(require.context('./activities', false, /\.json$/))

const getDistance = ({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) => {
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1))
      * Math.cos(deg2rad(lat2))
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
} // Distance in km

export default activities.map(({ gpx }) => {
  const endTime = gpx.trk.trkseg.trkpt[gpx.trk.trkseg.trkpt.length - 1].time
  const startTime = gpx.trk.trkseg.trkpt[0].time
  const distance = gpx.trk.trkseg.trkpt.reduce((acc, val) => ({
    sum: (acc.sum || 0) + getDistance(acc, val),
    ...val,
  })).sum

  return ({
    endTime,
    startTime,
    distance,
    name: gpx.trk.name,
    date: dayjs(gpx.trk.trkseg.trkpt[0].time).format('YYYY-MM-DD'),
    cords: gpx.trk.trkseg.trkpt.map((pt) => [pt.lat, pt.lon]),
    speed: distance / (dayjs(endTime).diff(startTime) / 3600000),
  })
})

