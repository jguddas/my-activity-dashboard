import React from 'react'
import C3Chart from 'react-c3js'
import styled from 'styled-components'
import { colors } from 'tabler-react'
import { sortBy } from 'lodash'

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
  activity, activities, mapTime, baseOnFastest,
}) {
  const baseActivity = baseOnFastest ? sortBy(activities, 'duration')[0] : activity
  const baseLine = mapData(baseActivity.trkpts.map(mapTime ? mapPtTime : mapPtDist))
  const matched = activities.map(({ trkpts, id }) => ({
    id,
    line: diff(baseLine, mapData(trkpts.map(mapTime ? mapPtTime : mapPtDist))),
  }))
  const current = matched.find(({ id }) => id === activity.id)

  return (
    <MyChart
      data={{
        columns: [
          ['stroke', ...current.line],
          ['fill', ...current.line],
          ...matched.map(({ line, id }) => [id, ...line]),
        ],
        type: 'line',
        colors: {
          fill: colors.purple,
          stroke: 'black',
          ...Object.fromEntries(matched.map(({ id }) => [id, 'gray'])),
        },
      }}
      point={{ show: false }}
      legend={{ show: false }}
      padding={{ left: -12, right: -12 }}
      axis={{ y: { show: false }, x: { show: false } }}
    />
  )
}

export default MatchedActivitiesChart

const MyChart = styled(C3Chart)`
  height: 10rem;
  * { fill: none };
  .c3-line {
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .c3-line-fill { stroke-width: 3; }
  .c3-line-stroke { stroke-width: 5; }
`
