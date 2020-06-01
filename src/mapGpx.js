import dayjs from 'dayjs'
import L from 'leaflet'
import { last } from 'lodash'

import getDistance from './getDistance.js'

const simplify = (trkpts, lvl) => L.LineUtil.simplify(
  trkpts.map((pt) => ({ x: Number(pt.lat), y: Number(pt.lon), ...pt })),
  10 ** lvl / 1000000,
)

const mapActivity = (gpx) => {
  const endTime = last(gpx.trk.trkseg.trkpt).time
  const startTime = gpx.trk.trkseg.trkpt[0].time
  const trkpts = simplify(gpx.trk.trkseg.trkpt, 2).reduce((acc, pt, idx) => {
    const time = dayjs(pt.time)
    const previousPt = acc[idx - 1]
    return [...acc, [
      pt.lat,
      pt.lon,
      pt.ele,
      time.diff(startTime),
      previousPt ? getDistance(previousPt, [pt.lat, pt.lon]) + previousPt[4] : 0,
    ]]
  }, [])
  const endpt = last(trkpts)
  const distance = endpt[4]

  return ({
    endTime,
    startTime,
    distance,
    name: gpx.trk.name,
    duration: dayjs(endTime).diff(startTime),
    date: dayjs(startTime).format('YYYY-MM-DD'),
    trkpts,
    startpt: trkpts[0],
    endpt,
    speed: distance / (dayjs(endTime).diff(startTime) / 3600000),
  })
}

export default mapActivity
