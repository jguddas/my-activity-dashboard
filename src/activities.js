import dayjs from 'dayjs'

import mapGpx from './mapGpx.js'

function importAll(r) {
  const cache = []
  r.keys().forEach((key) => cache.push({ key, ...r(key) }))
  return cache
}

const activities = importAll(require.context('./activities', false, /\.json$/))

const mappedActivities = activities.map(({ gpx, key }) => ({
  ...mapGpx(gpx),
  id: key.replace(/^.\//, '').replace(/\.\w*$/, ''),
})).sort((a, b) => dayjs(b.startTime).diff(a.startTime))

// console.log(JSON.stringify(mappedActivities))
export default mappedActivities
