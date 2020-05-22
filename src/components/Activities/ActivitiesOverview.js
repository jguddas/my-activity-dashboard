import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { groupBy, round, sumBy } from 'lodash'
import { Card, Badge, Button } from 'tabler-react'

import formatDuration from '../../formatDuration.js'

import ActivityCard from '../Activity/ActivityCard.js'

function ActivitiesOverview({ activities }) {
  const [state, setState] = useState(0)
  const activitiesGroupedByMonth = Object.values(groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  ))
  const activitiesGroupedByDate = groupBy(activitiesGroupedByMonth[state], 'date')

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
          {activitiesGroupedByMonth.map(([a], idx) => (
            <MyButton
              color={idx === state ? 'purple' : 'secondary'}
              onClick={() => idx !== state && setState(idx)}
            >
              {dayjs(a.date).format('MMM YYYY')}
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
