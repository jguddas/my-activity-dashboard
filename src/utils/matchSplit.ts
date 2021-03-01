import { activityMatcher, distanceMatcher, aTobMatcher } from './splitMatchers'

import { Split, SplitMatch } from '../types/split'
import { Activity } from '../types/activity'

export default (split:Split, activity:Activity):SplitMatch[] => {
  if (!activity.trkpts?.length) return []
  if (split.type === 'matched') return activityMatcher(split, activity)
  if (split.type === 'distance') return distanceMatcher(split, activity)
  if (split.type === 'aTob') return aTobMatcher(split, activity)
  return []
}
