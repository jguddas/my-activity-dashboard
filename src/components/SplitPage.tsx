import React, { useState } from 'react'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useHistory, Redirect } from 'react-router-dom'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import ShareButton from './ShareButton'
import ActivityButton from './ActivityButton'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import ActivityMap from './ActivityMap'
import DotGraph from './DotGraph'
import MatchedActivitiesTable from './MatchedActivitiesTable'
import SpeedGraphCard from './SpeedGraphCard'
import InfoCard from './InfoCard'

import matchSplit from '../utils/matchSplit'

import { Split, ATobSplitMatch, ActivitySplitMatch } from '../types/split'
import { Activity } from '../types/activity'

type Props = {
  split: Split,
  activities: Activity[],
  activity?: Activity,
  factor?: number
}

function SplitPage({ split, activities = [], activity, factor }: Props):JSX.Element {
  const history = useHistory()
  const [isFullscreen, setFullscreen] = useState(
    screenfull.isEnabled ? screenfull.isFullscreen : false,
  )

  const matchedSplits = activities.slice(0).reverse().flatMap((a) => matchSplit(split, a))

  if (matchedSplits.length && !activity && split.type !== 'matched') {
    return (
      <Redirect
        to={`/split/${split.id}/${matchedSplits[matchedSplits.length - 1].id}`}
      />
    )
  }

  const currentSplitMatch = matchedSplits.find(({ id }) => id === activity?.id)

  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={split.name}>
        {(split.type === 'aTob' || split.type === 'matched') && currentSplitMatch ? (
          <ShareButton
            split={split}
            splitMatch={currentSplitMatch as ATobSplitMatch}
          />
        ) : null}
        {activity ? (
          <ActivityButton
            to={`/activity/${activity.id}`}
          />
        ) : null}
      </PageHeader>
      {(split.type === 'aTob' || split.type === 'matched') && (
        currentSplitMatch ? (
          <div className="row row-cards">
            <div className="col col-12 col-sm-12 col-md-9">
              <ActivityMapWithSlider
                factor={factor}
                activity={currentSplitMatch as ActivitySplitMatch|ATobSplitMatch}
                matchedActivities={matchedSplits as ActivitySplitMatch[]|ATobSplitMatch[]}
              />
            </div>
            <div className="col col-12 col-sm-12 col-md-3">
              <InfoCard
                speed={currentSplitMatch.speed}
                duration={currentSplitMatch.duration}
                distance={currentSplitMatch.distance}
              />
              <SpeedGraphCard
                activity={currentSplitMatch as ActivitySplitMatch|ATobSplitMatch}
                matchedActivities={matchedSplits as ActivitySplitMatch[]|ATobSplitMatch[]}
              />
            </div>
          </div>
        ) : (
          <div className="card">
            <ActivityMap
              activity={split.type === 'matched' ? split.activity : {
                trkpts: [split.a, split.b],
                endpt: split.b,
              }}
              controls
              scrollWheelZoom={isFullscreen}
              dragging={isFullscreen}
              setFullscreen={setFullscreen}
              smoothFactor={3}
              height={isFullscreen ? '100vh' : 350}
            />
          </div>
        )
      )}
      {matchedSplits.length > 1 ? (
        <div className="card">
          <MyCardHeader className="card-header">
            <MyHeaderText>
              Matched Splits
              {' '}
            </MyHeaderText>
          </MyCardHeader>
          <div className="mx-5 mt-5" style={{ height: '10rem', cursor: 'pointer' }}>
            <DotGraph
              data={matchedSplits.map((matchedSplit) => matchedSplit.value)}
              isInteractive
              selected={activity ? matchedSplits.reduce<number[]>((acc, { id }, idx) => (
                id === activity.id ? [...acc, idx] : acc
              ), []) : []}
              onClick={(idx) => history.push(matchedSplits[idx].id)}
              format={(val, idx) => (
                <span>
                  <strong>
                    {dayjs(activities.find(({ id }) => id === matchedSplits[idx].id)?.date).format('DD.MM.YYYY')}
                  </strong>
                  &nbsp;
                  {matchedSplits[idx].label ?? matchedSplits[idx].value}
                </span>
              )}
            />
          </div>
        </div>
      ) : null}
      {matchedSplits.length > 0 && currentSplitMatch ? (
        <div className="card">
          <MatchedActivitiesTable
            activities={matchedSplits}
            activity={currentSplitMatch}
          />
        </div>
      ) : null}
    </PageWrapper>
  )
}

export default SplitPage

const MyCardHeader = styled.div`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
