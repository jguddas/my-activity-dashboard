import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Page, Card, Button } from 'tabler-react'

import getDistance from '../utils/getDistance.js'

import NavButton from './NavButton.js'
import ActivitySplits from './ActivitSplits.js'
import ActivityMapWithSlider from './ActivitMapWithSlider.js'
import MatchedActivitiesTable from './MatchedActivitiesTable.js'
import MatchedActivitiesChartCard from './MatchedActivitiesChartCard.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'

function ActivitysPage({ activity }) {
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
      <ActivityMapWithSlider activity={activity} />
    </Page.Content>
  )
}

export default ActivitysPage
