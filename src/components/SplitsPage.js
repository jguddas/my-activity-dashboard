import React from 'react'
import { withRouter } from 'react-router-dom'
import { Page, Card } from 'tabler-react'

import BackButton from './BackButton.js'
import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import SplitsTable from './SplitsTable.js'

function SplitsPage({ splits, history }) {
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
      {splits.length ? (
        <Card>
          <SplitsTable
            splits={splits}
            onClick={(id) => history.push(`/split/${id}`)}
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
