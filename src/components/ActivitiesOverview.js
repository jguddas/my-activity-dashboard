import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { groupBy, round, sumBy } from 'lodash'
import { Card, Badge, Button } from 'tabler-react'
import { Link } from 'react-router-dom'

import formatDuration from '../utils/formatDuration.js'

import ActivityCard from './ActivityCard.js'

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
            {todaysActivities.reverse().map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </MyCardBody>
        </Card>
      )) }
      {(
        <Pagination>
          {Object.entries(activitiesGroupedByMonth).map(([key, val]) => (
            <MyButton
              key={key}
              RootComponent={Link}
              color={key === month ? 'purple' : 'secondary'}
              to={`/activities/${key}`}
            >
              {dayjs(val[0].date).format('MMM YYYY')}
            </MyButton>
          )).reverse()}
        </Pagination>
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
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    display: block;
  }
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

const Pagination = styled.div``
