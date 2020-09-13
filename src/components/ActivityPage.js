import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Page, Button } from 'tabler-react'

import NavButton from './NavButton.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'

function ActivityPage({ activity, activities }) {
  return (
    <Page.Content>
      <ScrollToTopOnMount />
      <Page.Header>
        <NavButton />
        <Page.Title className="mr-auto">
          {`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}
        </Page.Title>
        <Button
          icon="arrow-left"
          prefix="fe"
          color="secondary"
          RootComponent={Link}
          to={`/activities/${dayjs(activity.date).format('YYYY-MM')}`}
        >
          Go Back
        </Button>
      </Page.Header>
      {activity.trkpts ? (
        <ActivityMapWithSlider
          activity={activity}
          matchedActivities={activities}
        />
      ) : null}
    </Page.Content>
  )
}

export default ActivityPage
