import React, { useState } from 'react'
import L from 'leaflet'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { Page, Card, Button, Icon } from 'tabler-react'

import PageHeader from './PageHeader.js'
import BackButton from './BackButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import ActivityMapWithSlider from './ActivityMapWithSlider.js'
import ActivityMap from './ActivityMap.js'
import DotGraph from './DotGraph.js'

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
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <PageHeader title={split.name}>
        <BackButton />
        {activity ? (
          <Button
            className="ml-1"
            color="secondary"
            RootComponent={Link}
            to={`/activity/${activity.id}`}
          >
            <Icon name="navigation" prefix="fe" className="mr-md-2" />
            <span className="d-none d-md-inline">
              Activity
            </span>
          </Button>
        ) : null}
      </PageHeader>
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
              selected={activity ? matchedSplits.reduce((acc, { id }, idx) => (
                id === activity.id ? [...acc, idx] : acc
              ), []) : []}
              onClick={(idx) => history.push(`/split/${split.id}/${matchedSplits[idx].id}`)}
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
