import React from 'react'
import loadable from '@loadable/component'
import { useSelector } from 'react-redux'
import { Grid } from 'tabler-react'
import { withRouter } from 'react-router-dom'

import PageWrapper from './PageWrapper.js'
import PageHeader from './PageHeader.js'
import UploadButton from './UploadButton.js'
import SyncButton from './SyncButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'

const ActivitiesOverview = loadable(() => import(
  /* webpackChunkName: "activities-overview" */
  './ActivitiesOverview.js'
))
const ActivitiesMonthlyCard = loadable(() => import(
  /* webpackChunkName: "activities-monthly-card" */
  './ActivitiesMonthlyCard.js'
))

function ActivitiesPage({ activities, month, history }) {
  const [loading, _setLoading] = React.useState(false)
  const setLoading = (value) => {
    if (value && !loading) {
      history.replace({ hash: '' })
    }
    _setLoading(value)
  }
  const isLogedIn = useSelector((state) => !!state.Strava.athlete)

  return (
    <PageWrapper>
      <ScrollToTopOnLocationChange />
      <PageHeader title="My Activities">
        <SyncButton
          disabled={loading}
          setLoading={setLoading}
        />
        <UploadButton
          disabled={loading}
          setLoading={setLoading}
        />
      </PageHeader>
      {activities.length && !loading ? (
        <Grid.Row className="flex-column-reverse flex-md-row">
          <Grid.Col md={9} sm={12} width={12} cards>
            <ActivitiesOverview
              activities={activities}
              month={month}
            />
          </Grid.Col>
          <Grid.Col md={3} sm={12} width={12} cards>
            <ActivitiesMonthlyCard
              activities={activities}
              month={month}
            />
          </Grid.Col>
        </Grid.Row>
      ) : (
        <div className="text-center">
          <h4 className="text-muted">
            {
              loading
                ? 'Loading...'
                : `Upload or ${isLogedIn ? '' : 'Login and '}Sync activities to get started.`
            }
          </h4>
        </div>
      )}
    </PageWrapper>
  )
}

export default withRouter(ActivitiesPage)
