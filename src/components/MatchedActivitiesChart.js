import React from 'react'
import { colors } from 'tabler-react'
import { sortBy, isFinite, last } from 'lodash'
import { ResponsiveLineCanvas } from '../nivo-line.esm.js'

import { drawLine } from '../utils/lineUtils.js'

const mapData = (data) => {
  let prev = -1
  let acc = []
  for (let x = 0; x < data.length; x += 1) {
    const next = Math.floor(data[x][0])
    if (prev !== next) {
      acc = acc.concat(
        new Array(next - prev - 1)
          .fill(data[data[x - 1] ? x - 1 : x][1]),
        data[x][1],
      )
      prev = next
    }
  }
  return acc
}

const diff = (a, b) => a.map((val, idx) => b[idx] - val)
const mapPtTime = (pt) => [pt[4] * 10, 0 - pt[3] / 10000]
const mapPtDist = (pt) => [pt[3] / 10000, pt[4]]

function MatchedActivitiesChart({
  activity, activities, mapTime, baseMethod, baseOrder,
}) {
  const baseActivity = baseMethod ? ((a) => (baseOrder ? a[0] : last(a)))(
    sortBy(activities, baseMethod),
  ) : activity
  const baseLine = mapData(baseActivity.trkpts.map(mapTime ? mapPtTime : mapPtDist))
  const matched = activities.map(({ trkpts, id }) => ({
    id,
    line: diff(baseLine, mapData(trkpts.map(mapTime ? mapPtTime : mapPtDist))),
  }))
  const maxLen = matched.reduce((acc, val) => (val.line.length > acc ? val.line.length : acc), 0)

  return (
    <div style={{ height: '10rem' }}>
      <ResponsiveLineCanvas
        data={matched.map(({ line, id }) => ({
          id: id === activity.id ? 0 : id,
          data: line
            .concat(new Array(maxLen - line.length).fill(null))
            .map((y, x) => ({ x, y: isFinite(y) ? y : null })),
        }))}
        lineWidth={3}
        curve="monotoneX"
        isInteractive={false}
        colors={({ id }) => (id ? 'gray' : colors.purple)}
        yScale={{ min: 'auto', max: 'auto', type: 'linear' }}
        xScale={{ min: 'auto', max: 'auto', type: 'linear' }}
        margin={{ top: 5, bottom: 5, right: 5 }}
        layers={[drawLine]}
      />
    </div>
  )
}

export default MatchedActivitiesChart
