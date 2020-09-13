import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Card } from 'tabler-react'
import LazyLoad from 'react-lazyload'

import ActivityMap from './ActivityMap.js'
import ActivityFooter from './ActivityFooter.js'

function ActivityCard({ activity }) {
  return (
    <Container>
      <MyCard>
        <Link to={`/activity/${encodeURI(activity.id)}`}>
          <MyCardHeader>
            <h4>{activity.name}</h4>
          </MyCardHeader>
        </Link>
        {activity.trkpts ? (
          <Link to={`/activity/${encodeURI(activity.id)}`}>
            <LazyLoad height={200} once>
              <ActivityMap activity={activity} />
            </LazyLoad>
          </Link>
        ) : null}
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
  width: 100%;
  @media (min-width: 768px) {
    width: 200px;
    margin: 5px;
  }
`
