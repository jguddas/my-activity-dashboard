import isFinite from 'lodash/isFinite'
import round from 'lodash/round'

import resample from './resample'
import { RESAMPLE_SCALE } from '../constants'

import { ActivityWithTrkpts } from '../types/activity'
import { DistanceSplit, DistanceSplitMatch } from '../types/split'

export default (
  { distance }:DistanceSplit,
  { trkpts, id, name, date, startTime }:ActivityWithTrkpts,
):DistanceSplitMatch[] => {
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
