import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { Page, Card, Badge, Button, Icon } from 'tabler-react'

import BackButton from './BackButton.js'
import NavButton from './NavButton.js'
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
    <Page.Content>
      <ScrollToTopOnMount />
      <Page.Header>
        <NavButton />
        <MyPageTitle>
          {`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}
        </MyPageTitle>
        <BackButton />
        <Button
          className="ml-1"
          color="secondary"
          RootComponent={Link}
          to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`}
        >
          <Icon name="calendar" prefix="fe" className="mr-md-2" />
          <span className="d-none d-md-inline">
            Overview
          </span>
        </Button>
        {!!activity.externalLink && (
        <Button
          className="ml-1"
          color="secondary"
          RootComponent="a"
          href={activity.externalLink}
          target="_blank"
        >
          <Icon name="external-link" prefix="fe" className="mr-md-2" />
          <span className="d-none d-md-inline">
            Source
          </span>
        </Button>
        )}
      </Page.Header>
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
    </Page.Content>
  )
}

export default withRouter(ActivityPage)

const MyPageTitle = styled(Page.Title)`
  width: 0;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

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
