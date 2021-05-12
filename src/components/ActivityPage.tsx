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
import SpeedGraphCard from './SpeedGraphCard'
import InfoCard from './InfoCard'
import ShareButton from './ShareButton'

import { Activity, ActivityWithTrkpts } from '../types/activity'

type Props = {
  activity: Activity
  activities: Activity[]
}

function ActivityPage({ activity, activities }: Props): JSX.Element {
  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${activity.name} - ${dayjs(activity.date).format('DD.MM.YYYY')}`}>
        {activity.trkpts ? (
          <ShareButton
            split={{ activity, name: activity.name, type: 'matched' }}
            splitMatch={activity as ActivityWithTrkpts}
          />
        ) : null}
        <MatchedActivitiesButton activity={activity} activities={activities} />
        <OverviewButton to={`/activities/${dayjs(activity.date).format('YYYY-MM#DD')}`} />
        {!!activity.externalLink && (<ExternalSourceButton to={activity.externalLink} />)}
      </PageHeader>
      {activity.trkpts ? (
        <>
          <div className="row row-cards">
            <div className="col col-12 col-sm-12 col-md-9">
              <ActivityMapWithSlider activity={activity} />
            </div>
            <div className="col col-12 col-sm-12 col-md-3">
              <InfoCard
                speed={activity.speed}
                duration={activity.duration}
                distance={activity.distance}
              />
              <SpeedGraphCard
                activity={activity}
                matchedActivities={[]}
              />
            </div>
          </div>
          <ActivitySplits activity={activity} />
        </>
      ) : null}
    </PageWrapper>
  )
}

export default ActivityPage
