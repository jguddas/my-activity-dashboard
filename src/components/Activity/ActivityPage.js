import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Page, Button } from 'tabler-react'

import ActivityMapWithSlider from './ActivitMapWithSlider.js'

function ActivitysPage({ activity }) {
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
      <ActivityMapWithSlider activity={activity} />
    </Page.Content>
  )
}

export default ActivitysPage
