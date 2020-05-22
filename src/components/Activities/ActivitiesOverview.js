import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { groupBy, round, sumBy } from 'lodash'
import { Card, Badge } from 'tabler-react'

import formatDuration from '../../formatDuration.js'

import ActivityCard from '../Activity/ActivityCard.js'

function ActivitiesOverview({ activities }) {
  const activitiesGroupedByDate = groupBy(activities, 'date')

  return (
    <>
      { Object.entries(activitiesGroupedByDate).map(([date, todaysActivities]) => (
        <Card key={date}>
          <MyCardHeader>
            <MyHeaderText>
              {dayjs(date).format('DD.MM.YYYY')}
            </MyHeaderText>
            <MyBadge color="default">
              <h6>
                {round(sumBy(todaysActivities, 'distance'), 2)}
                km
              </h6>
            </MyBadge>
            <MyBadge color="default">
              <h6>
                {formatDuration(sumBy(todaysActivities, 'duration'))}
              </h6>
            </MyBadge>
          </MyCardHeader>
          <MyCardBody>
            {todaysActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </MyCardBody>
        </Card>
      )) }
    </>
  )
}

export default ActivitiesOverview

const MyCardHeader = styled(Card.Header)`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`

const MyCardBody = styled(Card.Body)`
  padding-bottom: 0;
`

const MyBadge = styled(Badge)`
  h6 { margin-bottom: 0 };
  margin-left: .25rem;
`
