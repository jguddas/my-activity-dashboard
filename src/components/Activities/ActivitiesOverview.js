import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { groupBy, round, sumBy } from 'lodash'
import { Card, Badge, Button } from 'tabler-react'
import { Link } from 'react-router-dom'

import formatDuration from '../../formatDuration.js'

import ActivityCard from '../Activity/ActivityCard.js'

function ActivitiesOverview({ activities, month }) {
  const activitiesGroupedByMonth = groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  )
  const activitiesGroupedByDate = groupBy(activitiesGroupedByMonth[month], 'date')

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
      {(
        <Pagnition>
          {Object.entries(activitiesGroupedByMonth).map(([key, val]) => (
            <MyButton
              RootComponent={Link}
              color={key === month ? 'purple' : 'secondary'}
              to={`/activities/${key}`}
            >
              {dayjs(val[0].date).format('MMM YYYY')}
            </MyButton>
          )).reverse()}
        </Pagnition>
      )}
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

const MyButton = styled(Button)`
  margin-top: .5rem;
  &:not(:last-child) {
    margin-right: .5rem;
  }
`

const Pagnition = styled.div``
