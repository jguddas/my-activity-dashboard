import React from 'react'
import { Card, Form, Grid } from 'tabler-react'

import MatchedActivitiesChart from './MatchedActivitiesChart.js'

function MatchedActivitiesChartCard({ activity, activities }) {
  const [mapTime, setMapTime] = React.useState(false)
  const [baseOnFastest, setBaseOnFastest] = React.useState(true)
  if (activities.length <= 1) return null

  return (
    <Card>
      <Card.Header className="p-0 d-block">
        <MatchedActivitiesChart
          activities={activities}
          activity={activity}
          mapTime={mapTime}
          baseOnFastest={baseOnFastest}
        />
      </Card.Header>
      <div className="mr-4 ml-4 mt-2">
        <Grid.Row className="flex-column-reverse flex-md-row">
          <Grid.Col md={6} sm={12} width={12}>
            <Form.SelectGroup>
              <Form.SelectGroupItem
                checked={baseOnFastest}
                className="w-50"
                name="baseline"
                label="Fastest"
                onClick={() => setBaseOnFastest(true)}
              />
              <Form.SelectGroupItem
                checked={!baseOnFastest}
                className="w-50"
                name="baseline"
                label="Current"
                onClick={() => setBaseOnFastest(false)}
              />
            </Form.SelectGroup>
          </Grid.Col>
          <Grid.Col md={6} sm={12} width={12}>
            <Form.SelectGroup>
              <Form.SelectGroupItem
                checked={!mapTime}
                className="w-50"
                name="diffbase"
                label="Time"
                onClick={() => setMapTime(false)}
              />
              <Form.SelectGroupItem
                checked={mapTime}
                className="w-50"
                name="diffbase"
                label="Distance"
                onClick={() => setMapTime(true)}
              />
            </Form.SelectGroup>
          </Grid.Col>
        </Grid.Row>
      </div>
    </Card>
  )
}

export default MatchedActivitiesChartCard
