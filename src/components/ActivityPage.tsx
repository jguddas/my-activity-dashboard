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

import { Activity } from '../types/activity'

type Props = {
  activity: Activity
  activities: Activity[]
}

function ActivityPage({ activity, activities }: Props): JSX.Element {
  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}>
        <MatchedActivitiesButton activity={activity} activities={activities} />
        <OverviewButton to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`} />
        {!!activity.externalLink && (<ExternalSourceButton to={activity.externalLink} />)}
      </PageHeader>
      {activity.trkpts ? (
        <>
          <ActivityMapWithSlider activity={activity} />
          <ActivitySplits activity={activity} />
        </>
      ) : null}
    </PageWrapper>
  )
}

export default ActivityPage
