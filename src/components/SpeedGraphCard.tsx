import React from 'react'
import styled from 'styled-components'

import LineGraph from './LineGraph'

import resample from '../utils/resample'

import { Trkpt } from '../types/activity'

type Props = {
  activity: { trkpts: Trkpt[] }
  matchedActivities: {
    trkpts: Trkpt[]
    duration: number
  }[]
}

const map = (trkpts: Trkpt[]) => resample(
  trkpts.map((trkpt) => [trkpt[4], trkpt[3]]),
  0.0001 * trkpts.length,
).map((val, idx, arr) => (
  (0.0001 * trkpts.length) / (idx ? val[1] - arr[idx - 1][1] : 0))).slice(1)

const SpeedGraphCard = ({ activity, matchedActivities }:Props):JSX.Element => {
  const [first, second] = matchedActivities.slice(0).sort((a, b) => a.duration - b.duration)
  return (
    <div className="card" style={{ flexGrow: 1 }}>
      <MyCardHeader className="card-body" style={{ flexGrow: 0 }}>
        <div>
          <MyColorLedgendText>
            Speed
          </MyColorLedgendText>
        </div>
      </MyCardHeader>
      <MyCardBody className="card-body" style={{ height: '10rem', padding: 0 }}>
        <LineGraph
          data={[
            map(activity.trkpts),
            first ? map(first.trkpts) : [],
            second ? map(second.trkpts) : [],
          ]}
        />
      </MyCardBody>
    </div>
  )
}

export default SpeedGraphCard

const MyCardHeader = styled.div`
  padding: .75rem 1rem;
`

const MyColorLedgendText = styled.span`
  font-weight: 600;
  margin-left: .5rem;
`
const MyCardBody = styled.div`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`
