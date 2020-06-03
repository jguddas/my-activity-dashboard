import React from 'react'
import { useSelector } from 'react-redux'
import { Page, Grid } from 'tabler-react'

import LoginButton from './LoginButton.js'
import UploadButton from './UploadButton.js'
import SyncButton from './SyncButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'
import ActivitiesOverview from './ActivitiesOverview.js'
import ActivitiesMonthlyCard from './ActivitiesMonthlyCard.js'

function ActivitysPage({ activities, month }) {
  const [loading, setLoading] = React.useState(false)
  const isLogedIn = useSelector((state) => !!state.Strava.athlete)

  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <Page.Header>
        <Page.Title className="mr-auto">My Activities</Page.Title>
        <div>
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
        </div>
      </Page.Header>
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

export default ActivitysPage
