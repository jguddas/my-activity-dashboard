import React from 'react'
import styled from 'styled-components'

import { Card } from 'tabler-react'

import ActivityMap from './ActivityMap.js'
import ActivityFooter from './ActivityFooter.js'

import 'tabler-react/dist/Tabler.css'

function ActivityCard({ activity }) {
  return (
    <Container>
      <MyCard>
        <MyCardHeader>
          <h4>{activity.name}</h4>
        </MyCardHeader>
        <ActivityMap cords={activity.cords} />
        <ActivityFooter
          distance={activity.distance}
          speed={activity.speed}
          duration={activity.duration}
          startTime={activity.startTime}
        />
      </MyCard>
    </Container>
  )
}

export default ActivityCard

const MyCard = styled(Card)`
  overflow: hidden;
`

const MyCardHeader = styled(Card.Body)`
  border-bottom: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`

const Container = styled.div`
  display: inline-block;
  width: 200px;
  margin: 5px;
`
