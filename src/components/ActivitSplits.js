import React from 'react'
import styled from 'styled-components'
import C3Chart from 'react-c3js'
import {
  groupBy, floor, round, last,
} from 'lodash'
import { Card, colors } from 'tabler-react'

function ActivitySplits({ activity, splitFactor = 5 }) {
  const groupFn = (pt) => floor((pt[3] / 60000) / splitFactor)
  const grouped = Object.values(groupBy(activity.trkpts, groupFn))
  const data = grouped.map((pts) => {
    const lastPt = last(pts)
    const time = lastPt[3] - pts[0][3]
    const distance = lastPt[4] - pts[0][4]
    return distance / (time / 3600000)
  })

  return (
    <Card>
      <MyChart
        data={{
          columns: [
            ['data', ...data],
          ],
          colors: {
            data: colors.purple,
          },
          type: 'bar',
        }}
        tooltip={{
          contents: ([{ value }]) => (`
            <span class="tag tag-default">
              ${round(value, 1)}km/h
              <span class="tag-addon">${round(value * (splitFactor / 60), 2)}km</span>
            </span>
          `),
        }}
        legend={{ show: false }}
        axis={{ y: { show: false }, x: { show: false } }}
        padding={{ bottom: -8, top: -8 }}
      />
    </Card>
  )
}

export default ActivitySplits

const MyChart = styled(C3Chart)`
  height: 10rem;
`
