import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Page, Card, Button } from 'tabler-react'

import getDistance from '../../getDistance.js'

import ActivityMapWithSlider from './ActivitMapWithSlider.js'
import MatchedActivitiesTable from '../Matched/MatchedActivitiesTable.js'

function ActivitysPage({ activity, activities }) {
  const isRoundTrip = getDistance(activity.startpt, activity.endpt) <= 0.5

  const matchedActivities = isRoundTrip
    ? [activity]
    : activities.filter(({ startpt, endpt }) => (
      getDistance(endpt, activity.endpt) < 0.5
      && getDistance(startpt, activity.startpt) < 0.5
    ))

  return (
    <Page.Content>
      <Button
        icon="arrow-left"
        prefix="fe"
        color="secondary"
        RootComponent={Link}
        to={`/activities/${dayjs(activity.date).format('YYYY-MM')}`}
      >
        Go Back
      </Button>
      <Page.Header>
        <Page.Title>
          {`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}
        </Page.Title>
      </Page.Header>
      <ActivityMapWithSlider
        activity={activity}
        matchedActivities={
          matchedActivities.filter(({ id }) => id !== activity.id)
        }
      />
      <Card>
        <Card.Header>
          <Card.Title>Matched - Start and End Point</Card.Title>
        </Card.Header>
        <MatchedActivitiesTable
          activities={matchedActivities}
          activity={activity}
        />
      </Card>
    </Page.Content>
  )
}

export default ActivitysPage
