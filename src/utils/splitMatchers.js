import isFinite from 'lodash/isFinite.js'
import round from 'lodash/round.js'

import formatDuration from './formatDuration.js'
import getDistance from './getDistance.js'
import resample from './resample.js'
import { RESAMPLE_SCALE } from '../constants.js'

const aTobMatcher = ({ a, b }, { trkpts, id, name, date, startTime }) => {
  const adjustTrkpt = (startpt) => ([lat, lon, alt, time, distance]) => [
    lat,
    lon,
    alt,
    time - startpt[3],
    distance - startpt[4],
  ]
  let i; let j; let start = null; const result = []
  for (i = 0, j = trkpts.length; i < j; i += 1) {
    if (getDistance(a, trkpts[i]) < 0.05) {
      start = i
    }
    if (start && getDistance(b, trkpts[i]) < 0.05) {
      const duration = trkpts[i][3] - trkpts[start][3]
      const distance = trkpts[i][4] - trkpts[start][4]
      result.push({
        id,
        name,
        date,
        startTime,
        trkpts: trkpts.slice(start, i).map(adjustTrkpt(trkpts[start])),
        strtpt: trkpts[start],
        endpt: trkpts[i],
        value: trkpts[i][3] - trkpts[start][3],
        speed: distance * (3600000 / duration),
        duration,
        distance,
        label: formatDuration(trkpts[i][3] - trkpts[start][3]),
      })
      start = null
    }
  }
  return result
}

const distanceMatcher = ({ distance }, { trkpts, id, name, date, startTime }) => {
  const alignedTrpts = resample(
    trkpts.map((trkpt) => [trkpt[4], trkpt[3] / 60000]),
    RESAMPLE_SCALE,
  )

  const splits = alignedTrpts
    .map((v, i) => (alignedTrpts[i + distance / RESAMPLE_SCALE] || [])[1] - v[1])
    .map((val) => (60 * distance) / val)

  const minIdx = splits.reduce((iMin, x, i, a) => (x > a[iMin] ? i : iMin), 0)

  if (isFinite(splits[minIdx])) {
    return [{
      id,
      name,
      date,
      startTime,
      distance,
      duration: (distance / splits[minIdx]) * 3600000,
      speed: splits[minIdx],
      value: splits[minIdx],
      label: `${round(splits[minIdx], 2)}km/h`,
    }]
  }

  return []
}

export default { distance: distanceMatcher, aTob: aTobMatcher }
