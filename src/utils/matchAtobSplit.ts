import formatDuration from './formatDuration'
import getDistance from './getDistance'

import { ActivityWithTrkpts, Trkpt } from '../types/activity'
import { ATobSplitMatch } from '../types/split'

export default (
  { a, b }: { a: [number, number] | Trkpt, b: [number, number] | Trkpt },
  { trkpts, id, name, date, startTime }:ActivityWithTrkpts,
):ATobSplitMatch[] => {
  const adjustTrkpt = (startpt:Trkpt) => (
    ([lat, lon, alt, time, distance]:Trkpt):Trkpt => (
      [lat, lon, alt, time - startpt[3], distance - startpt[4]]
    )
  )
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
