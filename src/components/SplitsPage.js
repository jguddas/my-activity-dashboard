import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'tabler-react'

import PageWrapper from './PageWrapper.js'
import PageHeader from './PageHeader.js'
import SyncStarredSegmentsButton from './SyncStarredSegmentsButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import SplitsTable from './SplitsTable.js'

function SplitsPage({ splits, history }) {
  const [loading, setLoading] = React.useState(false)

  return (
    <PageWrapper>
      <ScrollToTopOnLocationChange />
      <PageHeader title="My Splits">
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
    </PageWrapper>
  )
}

export default withRouter(SplitsPage)
