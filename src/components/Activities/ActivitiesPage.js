import React from 'react'
import { Page, Grid } from 'tabler-react'

import ActivitiesOverview from './ActivitiesOverview.js'
import ActivitiesMonthlyCard from './ActivitiesMonthlyCard.js'

function ActivitysPage({ activities, month }) {
  return (
    <Page.Content title="My Activities">
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
    </Page.Content>
  )
}

export default ActivitysPage
