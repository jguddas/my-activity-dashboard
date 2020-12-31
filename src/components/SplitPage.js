import React, { useState } from 'react'
import L from 'leaflet'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Page, Card } from 'tabler-react'

import BackButton from './BackButton.js'
import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ActivityMap from './ActivityMap.js'
import DotGraph from './DotGraph.js'

import splitMatchers from '../utils/splitMatchers.js'

function SplitPage({ split, activities, history }) {
  const [isFullscreen, setFullscreen] = useState(screenfull.isFullscreen)

  const matchedSplits = activities
    .filter((activity) => activity.trkpts)
    .reverse()
    .flatMap((_activity) => splitMatchers[split.type](split, _activity))

  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <Page.Header>
        <NavButton />
        <MyPageTitle>
          {split.name}
        </MyPageTitle>
        <BackButton to="/splits" className="mr-1" />
      </Page.Header>
      {split.type === 'aTob' && (
        matchedSplits.length > 0 ? (
          <ActivityMapWithSlider
            factor={0.0005}
            activity={matchedSplits[matchedSplits.length - 1]}
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
              selected={[matchedSplits.length - 1]}
              onClick={(idx) => history.push(`/activity/${matchedSplits[idx].id}`)}
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
      )}
    </Page.Content>
  )
}

export default withRouter(SplitPage)

const MyPageTitle = styled(Page.Title)`
  width: 0;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const MyCardHeader = styled(Card.Header)`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
