import React from 'react'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import MatchedActivitiesTable from './MatchedActivitiesTable'
import SpeedGraphCard from './SpeedGraphCard'
import InfoCard from './InfoCard'

import matchAtobSplit from '../utils/matchAtobSplit'

import { Trkpt, Activity, ActivityWithTrkpts } from '../types/activity'

type Props = {
  shared: {
    name: string
    sender: string
    a: Trkpt,
    b: Trkpt,
    trkpts: Trkpt[]
  },
  factor?: number
  activities: Activity[],
}

function SharedPage({ shared, activities, factor }: Props):JSX.Element {
  const matchedSplits = activities.filter((a) => a.trkpts?.length)
    .reverse()
    .flatMap((a) => matchAtobSplit(shared, a as ActivityWithTrkpts))
  const endpt = shared.trkpts[shared.trkpts.length - 1]
  const duration = endpt[3] - shared.trkpts[0][3]
  const distance = endpt[4]
  const speed = distance / (duration / 3600000)
  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${shared.name} shared by ${shared.sender}`} />
      <div className="row row-cards">
        <div className="col col-12 col-sm-12 col-md-9">
          <ActivityMapWithSlider
            factor={factor}
            matchedActivities={matchedSplits}
            activity={{ trkpts: shared.trkpts, duration, endpt }}
          />
        </div>
        <div className="col col-12 col-sm-12 col-md-3">
          <InfoCard
            speed={speed}
            duration={duration}
            distance={distance}
          />
          <SpeedGraphCard
            activity={shared}
            matchedActivities={matchedSplits}
          />
        </div>
      </div>
      {matchedSplits.length ? (
        <div className="card">
          <MatchedActivitiesTable
            diffBase={{
              speed,
              duration,
              distance,
            }}
            linkBase="/activity/"
            activities={matchedSplits}
          />
        </div>
      ) : null}
    </PageWrapper>
  )
}

export default SharedPage
