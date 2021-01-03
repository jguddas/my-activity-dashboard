import React from 'react'
import styled from 'styled-components'
import loadable from '@loadable/component'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import ActivityFooter from './ActivityFooter.js'

const ActivityMap = loadable(() => import(
  /* webpackChunkName: "activity-map" */
  './ActivityMap.js'
))

function ActivityCard({ activity }) {
  return (
    <Container>
      <MyCard className="card">
        <Link to={`/activity/${encodeURI(activity.id)}`}>
          <MyCardHeader className="card-body">
            <h4>{activity.name}</h4>
          </MyCardHeader>
        </Link>
        {activity.trkpts ? (
          <Link
            to={`/activity/${encodeURI(activity.id)}`}
            style={{ height: 200 }}
          >
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

const MyCard = styled.div`
  overflow: hidden;
`

const MyCardHeader = styled.div`
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
