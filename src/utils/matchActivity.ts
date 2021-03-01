import formatDuration from './formatDuration'
import getDistance from './getDistance'

import { ActivityWithTrkpts } from '../types/activity'
import {
  ActivitySplit,
  ActivitySplitMatch,
} from '../types/split'

export default (
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
