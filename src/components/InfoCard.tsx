import React from 'react'
import styled from 'styled-components'

import ActivityFooter from './ActivityFooter'

type Props = {
  speed: number
  distance: number
  duration: number
}

const InfoCard = ({ speed, distance, duration }:Props):JSX.Element => (
  <div className="card">
    <MyCardHeader className="card-body" style={{ flexGrow: 0 }}>
      <div>
        <MyColorLedgendText>
          Info
        </MyColorLedgendText>
      </div>
    </MyCardHeader>
    <ActivityFooter
      duration={duration}
      distance={distance}
      speed={speed}
    />
  </div>
)

export default InfoCard

const MyCardHeader = styled.div`
  padding: .75rem 1rem;
`

const MyColorLedgendText = styled.span`
  font-weight: 600;
  margin-left: .5rem;
`
