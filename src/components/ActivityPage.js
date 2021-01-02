import React from 'react'
import dayjs from 'dayjs'

import PageWrapper from './PageWrapper.js'
import PageHeader from './PageHeader.js'
import OverviewButton from './OverviewButton.js'
import MatchedActivitiesButton from './MatchedActivitiesButton.js'
import ExternalSourceButton from './ExternalSourceButton.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'

function ActivityPage({ activity, activities }) {
  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}>
        <MatchedActivitiesButton activity={activity} activities={activities} />
        <OverviewButton to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`} />
        {!!activity.externalLink && (<ExternalSourceButton to={activity.externalLink} />)}
      </PageHeader>
      {activity.trkpts ? <ActivityMapWithSlider activity={activity} /> : null}
    </PageWrapper>
  )
}

export default ActivityPage
