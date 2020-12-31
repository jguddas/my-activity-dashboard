import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Page, Card } from 'tabler-react'

import BackButton from './BackButton.js'
import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import SplitsTable from './SplitsTable.js'
import SplitsGraph from './SplitsGraph.js'

function SplitsPage({ splitId, history }) {
  const splits = useSelector((state) => state.Split.splits)
  const activities = useSelector((state) => state.Activity.activities.filter((val) => val.trkpts))

  const split = splits.find(({ id }) => `${id}` === splitId)

  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <Page.Header>
        <NavButton />
        <Page.Title className="mr-auto">
          My Splits
        </Page.Title>
        <BackButton to="/" />
      </Page.Header>
      {!!split && (
        <div className="mx-5 mt-5" style={{ height: '10rem', cursor: 'pointer' }}>
          <SplitsGraph
            activities={activities}
            onClick={(id) => history.push(`/activity/${id}`)}
            split={split}
          />
        </div>
      )}
      {splits.length ? (
        <Card>
          <SplitsTable
            splits={splits}
            onClick={(id) => history.push(`/splits/${id}`)}
          />
        </Card>
      ) : (
        <div className="text-center">
          <h4 className="text-muted">
            ...
          </h4>
        </div>
      )}
    </Page.Content>
  )
}

export default withRouter(SplitsPage)
