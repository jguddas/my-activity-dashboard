import React from 'react'
import styled from 'styled-components'

import LineGraph from './LineGraph'

import resample from '../utils/resample'

import { Trkpt } from '../types/activity'

type Props = {
  activity: { trkpts: Trkpt[], id: string }
  matchedActivities: {
    trkpts: Trkpt[]
    duration: number
    id: string
  }[]
}

const map = (trkpts: Trkpt[], factor:number) => resample(
  trkpts.map((trkpt) => [trkpt[4], trkpt[3]]),
  factor,
).map((val, idx, arr) => (factor / (idx ? val[1] - arr[idx - 1][1] : 0)))
  .slice(1)

const SpeedGraphCard = ({ activity, matchedActivities }:Props):JSX.Element => {
  const [first, second] = matchedActivities
    .slice(0)
    .sort((a, b) => a.duration - b.duration)
    .filter(({ id }) => id !== activity.id)
  const factor = 0.0001 * activity.trkpts.length
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
            map(activity.trkpts, factor),
            first ? map(first.trkpts, factor) : [],
            second ? map(second.trkpts, factor) : [],
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
