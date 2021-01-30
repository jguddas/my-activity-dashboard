import React, { useState } from 'react'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter, Redirect } from 'react-router-dom'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import ActivityButton from './ActivityButton'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import ActivityMapWithSlider from './ActivityMapWithSlider'
import ActivityMap from './ActivityMap'
import DotGraph from './DotGraph'
import MatchedActivitiesTable from './MatchedActivitiesTable'

import splitMatchers from '../utils/splitMatchers'

function SplitPage({ split, activities, activity, history, factor }) {
  const [isFullscreen, setFullscreen] = useState(screenfull.isFullscreen)

  const matchedSplits = activities
    .filter((_activity) => _activity.trkpts)
    .reverse()
    .flatMap((_activity) => splitMatchers[split.type](split, _activity))

  if (matchedSplits.length && !activity) {
    return (
      <Redirect
        to={`/split/${split.id}/${matchedSplits[matchedSplits.length - 1].id}`}
      />
    )
  }

  return (
    <PageWrapper>
      <ScrollToTopOnMount />
      <PageHeader title={split.name}>
        {activity ? (
          <ActivityButton
            to={`/activity/${activity.id}`}
          />
        ) : null}
      </PageHeader>
      {(split.type === 'aTob' || split.type === 'matched') && (
        matchedSplits.length > 0 ? (
          <ActivityMapWithSlider
            factor={factor}
            activity={matchedSplits.find(({ id }) => id === activity.id)}
            matchedActivities={matchedSplits}
          />
        ) : (
          <div className="card">
            <ActivityMap
              activity={{
                trkpts: [split.a, split.b],
                startpt: split.a,
                endpt: split.b,
              }}
              controls
              scrollWheelZoom={isFullscreen}
              dragging={isFullscreen || 'touch'}
              setFullscreen={setFullscreen}
              smoothFactor={3}
              height={isFullscreen ? '100vh' : 350}
            />
          </div>
        )
      )}
      {matchedSplits.length > 0 && (
        < >
          <div className="card">
            <MyCardHeader className="card-header">
              <MyHeaderText>
                Matched Splits
              </MyHeaderText>
            </MyCardHeader>
            <div className="mx-5 mt-5" style={{ height: '10rem', cursor: 'pointer' }}>
              <DotGraph
                data={matchedSplits.map((matchedSplit) => matchedSplit.value)}
                isInteractive
                selected={activity ? matchedSplits.reduce((acc, { id }, idx) => (
                  id === activity.id ? [...acc, idx] : acc
                ), []) : []}
                onClick={(idx) => history.push(matchedSplits[idx].id)}
                format={(val, idx) => (
                  <span>
                    <strong>
                      {dayjs(activities.find(({ id }) => id === matchedSplits[idx].id).date).format('DD.MM.YYYY')}
                    </strong>
                    &nbsp;
                    {matchedSplits[idx].label ?? matchedSplits[idx].value}
                  </span>
                )}
              />
            </div>
          </div>
          <div className="card">
            <MatchedActivitiesTable
              activities={matchedSplits}
              activity={matchedSplits.find(({ id }) => id === activity.id)}
            />
          </div>
        </>
      )}
    </PageWrapper>
  )
}

export default withRouter(SplitPage)

const MyCardHeader = styled.div`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
