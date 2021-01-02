import React, { useState } from 'react'
import L from 'leaflet'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter, Redirect } from 'react-router-dom'
import { Card } from 'tabler-react'

import PageWrapper from './PageWrapper.js'
import PageHeader from './PageHeader.js'
import ActivityButton from './ActivityButton.js'
import ScrollToTopOnMount from './ScrollToTopOnMount.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ActivityMap from './ActivityMap.js'
import DotGraph from './DotGraph.js'
import MatchedActivitiesTable from './MatchedActivitiesTable.js'

import splitMatchers from '../utils/splitMatchers.js'

function SplitPage({ split, activities, activity, history }) {
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
      {split.type === 'aTob' && (
        matchedSplits.length > 0 ? (
          <ActivityMapWithSlider
            factor={0.0005}
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
              dragging={isFullscreen || !L.Browser.touch}
              setFullscreen={setFullscreen}
              smoothFactor={3}
              height={isFullscreen ? '100vh' : 350}
            />
          </div>
        )
      )}
      {matchedSplits.length > 0 && (
        < >
          <Card>
            <MyCardHeader>
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
          </Card>
          <Card>
            <MatchedActivitiesTable
              activities={matchedSplits}
              activity={matchedSplits.find(({ id }) => id === activity.id)}
            />
          </Card>
        </>
      )}
    </PageWrapper>
  )
}

export default withRouter(SplitPage)

const MyCardHeader = styled(Card.Header)`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
