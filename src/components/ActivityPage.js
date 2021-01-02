import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Card, Badge } from 'tabler-react'

import PageWrapper from './PageWrapper.js'
import PageHeader from './PageHeader.js'
import OverviewButton from './OverviewButton.js'
import ExternalSourceButton from './ExternalSourceButton.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'
import DotGraph from './DotGraph.js'

import getDistance from '../utils/getDistance.js'
import formatDuration from '../utils/formatDuration.js'

function ActivityPage({ activity, activities, history }) {
  const isRoundTrip = !(activity.startpt || activity.endpt)
    || getDistance(activity.startpt, activity.endpt) <= 0.5

  const matchedActivities = isRoundTrip
    ? [activity]
    : activities.filter(({ startpt, endpt, distance }) => (
      startpt
      && endpt
      && Math.abs(activity.distance - distance) < 2
      && getDistance(endpt, activity.endpt) < 0.5
      && getDistance(startpt, activity.startpt) < 0.5
    )).reverse()

  const durations = matchedActivities.map(({ duration }) => duration)
  const minDuration = durations.reduce((acc, val) => (acc < val ? acc : val))

  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}>
        <OverviewButton to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`} />
        {!!activity.externalLink && (<ExternalSourceButton to={activity.externalLink} />)}
      </PageHeader>
      {activity.trkpts ? (
        <ActivityMapWithSlider
          activity={activity}
          matchedActivities={matchedActivities.filter(({ id }) => id !== activity.id)}
        />
      ) : null}
      {matchedActivities.length > 1 && (
      <Card>
        <MyCardHeader>
          <MyHeaderText>
            Matched Activities
          </MyHeaderText>
          <MyBadge color="default">
            <h6>
              +
              {formatDuration(activity.duration - minDuration)}
            </h6>
          </MyBadge>
        </MyCardHeader>
        <div className="mx-5 mt-5" style={{ height: '10rem', cursor: 'pointer' }}>
          <DotGraph
            data={durations.map((duration) => duration - minDuration)}
            selected={[matchedActivities.findIndex(({ id }) => id === activity.id)]}
            isInteractive
            onClick={(idx) => history.push(`/activity/${matchedActivities[idx].id}`)}
            format={(val, idx) => (
              <span>
                <strong>{dayjs(matchedActivities[idx].date).format('DD.MM.YYYY')}</strong>
                &nbsp;
                {formatDuration(matchedActivities[idx].duration)}
              </span>
            )}
          />
        </div>
      </Card>
      )}
    </PageWrapper>
  )
}

export default withRouter(ActivityPage)

const MyCardHeader = styled(Card.Header)`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`

const MyBadge = styled(Badge)`
  h6 { margin-bottom: 0 };
  margin-left: .25rem;
`
