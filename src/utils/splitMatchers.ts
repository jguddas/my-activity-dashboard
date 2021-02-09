import isFinite from 'lodash/isFinite'
import round from 'lodash/round'

import formatDuration from './formatDuration'
import getDistance from './getDistance'
import resample from './resample'
import { RESAMPLE_SCALE } from '../constants'

import { ActivityWithTrkpts, Trkpt } from '../types/activity'
import {
  ActivitySplit,
  ActivitySplitMatch,
  DistanceSplit,
  DistanceSplitMatch,
  AToBSplit,
  ATobSplitMatch,
} from '../types/split'

const aTobMatcher = (
  { a, b }:AToBSplit,
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

const distanceMatcher = (
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

const activityMatcher = (
  split: ActivitySplit,
  activity:ActivityWithTrkpts,
):ActivitySplitMatch[] => {
  if (
    activity.startpt
      && activity.endpt
      && Math.abs(split.activity.distance - activity.distance) < 2
      && getDistance(activity.endpt, split.activity.endpt) < 0.5
      && getDistance(activity.startpt, split.activity.startpt) < 0.5
  ) {
    return [{
      ...activity,
      value: activity.duration,
      label: formatDuration(activity.duration),
    }]
  }
  return []
}

export default {
  distance: distanceMatcher,
  aTob: aTobMatcher,
  matched: activityMatcher,
}
