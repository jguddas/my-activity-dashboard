import matchActivity from './matchActivity'
import matchDistanceSplit from './matchDistanceSplit'
import matchAtobSplit from './matchAtobSplit'

import { Split, SplitMatch } from '../types/split'
import { Activity } from '../types/activity'

export default (split:Split, activity:Activity):SplitMatch[] => {
  if (!activity.trkpts?.length) return []
  if (split.type === 'matched') return matchActivity(split, activity)
  if (split.type === 'distance') return matchDistanceSplit(split, activity)
  if (split.type === 'aTob') return matchAtobSplit(split, activity)
  return []
}
