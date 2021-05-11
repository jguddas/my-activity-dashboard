import React from 'react'
import styled from 'styled-components'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import MatchedActivitiesTable from './MatchedActivitiesTable'

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
  const duration = shared.trkpts[shared.trkpts.length - 1][3] - shared.trkpts[0][3]
  const endpt = shared.trkpts[shared.trkpts.length - 1]
  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={`${shared.name} shared by ${shared.sender}`} />
      <ActivityMapWithSlider
        factor={factor}
        matchedActivities={matchedSplits}
        activity={{ trkpts: shared.trkpts, duration, endpt }}
      />
      {matchedSplits.length ? (
        <div className="card">
          <MatchedActivitiesTable
            diffBase={{
              speed: 0,
              duration,
              distance: 0,
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

const MyCardHeader = styled.div`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
