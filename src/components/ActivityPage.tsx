import React from 'react'
import dayjs from 'dayjs'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import OverviewButton from './OverviewButton'
import MatchedActivitiesButton from './MatchedActivitiesButton'
import ExternalSourceButton from './ExternalSourceButton'
import ActivitySplits from './ActivitySplits'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import ScrollToTopOnMount from './ScrollToTopOnMount'

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
      <ActivitySplits activity={activity} activities={activities} />
    </PageWrapper>
  )
}

export default ActivityPage
