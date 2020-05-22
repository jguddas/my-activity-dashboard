import React from 'react'
import { Page, Grid } from 'tabler-react'

import ActivitiesOverview from './ActivitiesOverview.js'
import ActivitiesMonthlyCard from './ActivitiesMonthlyCard.js'

function ActivitysPage({ activities }) {
  return (
    <Page.Content title="My Activities">
      <Grid.Row>
        <Grid.Col width={9}>
          <ActivitiesOverview activities={activities} />
        </Grid.Col>
        <Grid.Col width={3} cards>
          <ActivitiesMonthlyCard activities={activities} />
        </Grid.Col>
      </Grid.Row>
    </Page.Content>
  )
}

export default ActivitysPage
