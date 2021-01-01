import React from 'react'
import { withRouter } from 'react-router-dom'
import { Page, Card } from 'tabler-react'

import PageHeader from './PageHeader.js'
import OverviewButton from './OverviewButton.js'
import SyncStarredSegmentsButton from './SyncStarredSegmentsButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import SplitsTable from './SplitsTable.js'

function SplitsPage({ splits, history }) {
  const [loading, setLoading] = React.useState(false)

  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <PageHeader title="My Splits">
        <OverviewButton />
        <SyncStarredSegmentsButton
          disabled={loading}
          setLoading={setLoading}
        />
      </PageHeader>
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
