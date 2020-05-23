import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card, colors } from 'tabler-react'

import ActivityMap from './ActivityMap.js'
import ActivityFooter from './ActivityFooter.js'

import 'tabler-react/dist/Tabler.css'

function ActivityCard({ activity }) {
  return (
    <Container>
      <MyCard>
        <Link to={`/activity/${encodeURI(activity.id)}`}>
          <MyCardHeader>
            <h4>{activity.name}</h4>
          </MyCardHeader>
        </Link>
        <Link to={`/activity/${encodeURI(activity.id)}`}>
          <ActivityMap cords={activity.trkpts.map(([lat, lng]) => [lat, lng])} />
        </Link>
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
  color: #495057;
  &:hover {
    color: ${colors['purple-darker']};
  }
`

const Container = styled.div`
  display: inline-block;
  width: 200px;
  margin: 5px;
`
