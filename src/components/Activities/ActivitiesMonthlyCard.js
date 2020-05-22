import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { sumBy, groupBy } from 'lodash'
import { Card, Button } from 'tabler-react'

import ActivityFooter from '../Activity/ActivityFooter.js'

function ActivitiesCard({ activities }) {
  const activitiesGroupedByMonth = groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  )
  const [state, setState] = useState(0)
  const activityMonths = Object.values(activitiesGroupedByMonth)
  const currentActivities = activityMonths[state]
  return (
    <Card>
      <MyCardHeader>
        <MyButton
          icon="chevron-left"
          prefix="fe"
          onClick={() => setState(state + 1)}
          disabled={!activityMonths[state + 1]}
        />
        <MyHeaderText>
          {dayjs(currentActivities[0].date).format('MMM YYYY')}
        </MyHeaderText>
        <MyButton
          icon="chevron-right"
          prefix="fe"
          onClick={() => setState(state - 1)}
          disabled={!activityMonths[state - 1]}
        />
      </MyCardHeader>
      <ActivityFooter
        duration={sumBy(currentActivities, 'duration')}
        distance={sumBy(currentActivities, 'distance')}
      />
    </Card>
  )
}

export default ActivitiesCard

const MyHeaderText = styled.h4`
  text-align: center;
  margin-bottom: 0;
  padding: 0 .5rem;
  flex-grow: 1;
`

const MyCardHeader = styled(Card.Header)`
  padding: .5rem;
`

const MyButton = styled(Button)`
  &:disabled {
    cursor: default;
    opacity: 0;
  }
`
