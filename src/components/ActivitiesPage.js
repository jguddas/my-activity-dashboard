import React from 'react'
import { useSelector } from 'react-redux'
import { Page, Grid } from 'tabler-react'
import { withRouter } from 'react-router-dom'

import PageHeader from './PageHeader.js'
import BackButton from './BackButton.js'
import LoginButton from './LoginButton.js'
import UploadButton from './UploadButton.js'
import SyncButton from './SyncButton.js'
import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import ActivitiesOverview from './ActivitiesOverview.js'
import ActivitiesMonthlyCard from './ActivitiesMonthlyCard.js'

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
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <PageHeader title="My Activities">
        <BackButton className="mr-1" />
        <SyncButton
          className="mr-1"
          disabled={loading}
          setLoading={setLoading}
        />
        <UploadButton
          className="mr-1"
          disabled={loading}
          setLoading={setLoading}
        />
        <LoginButton />
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
    </Page.Content>
  )
}

export default withRouter(ActivitiesPage)
