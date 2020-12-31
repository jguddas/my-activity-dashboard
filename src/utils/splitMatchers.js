import isFinite from 'lodash/isFinite.js'
import round from 'lodash/round.js'

import resample from './resample.js'
import { RESAMPLE_SCALE } from '../constants.js'

const distanceMatcher = ({ distance }, { trkpts, id }) => {
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
      value: splits[minIdx],
      label: `${round(splits[minIdx], 2)}km/h`,
    }]
  }

  return []
}

export default { distance: distanceMatcher }
