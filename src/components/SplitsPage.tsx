import React from 'react'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import SyncStarredSegmentsButton from './SyncStarredSegmentsButton'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange'
import SplitsTable from './SplitsTable'

function SplitsPage({ splits }) {
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
        <div className="card">
          <SplitsTable
            splits={splits}
          />
        </div>
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

export default SplitsPage
