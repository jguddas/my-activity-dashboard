import React from 'react'
import dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'
import { Page, Card } from 'tabler-react'

import BackButton from './BackButton.js'
import NavButton from './NavButton.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'

function ActivityPage({ activity }) {
  return (
    <Page.Content>
      <ScrollToTopOnMount />
      <Page.Header>
        <NavButton />
        <Page.Title className="mr-auto">
          {`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}
        </Page.Title>
        <BackButton to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`} />
      </Page.Header>
      {activity.trkpts ? (
        <ActivityMapWithSlider
          activity={activity}
          matchedActivities={[]}
        />
      ) : null}
    </Page.Content>
  )
}

export default ActivityPage
