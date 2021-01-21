import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import sumBy from 'lodash/sumBy.js'
import round from 'lodash/round.js'
import groupBy from 'lodash/groupBy.js'
import { Link } from 'react-router-dom'

import formatDuration from '../utils/formatDuration.js'

import ActivityCard from './ActivityCard.js'
import ScrollToElementOnHashChange from './ScrollToElementOnHashChange.js'

function ActivitiesOverview({ activities, month }) {
  const activitiesGroupedByMonth = groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  )
  const activitiesGroupedByDate = groupBy(activitiesGroupedByMonth[month], 'date')

  return (
    <>
      { Object.entries(activitiesGroupedByDate).map(([date, todaysActivities]) => (
        <ScrollToElementOnHashChange
          id={dayjs(date).format('DD')}
          className="card"
          key={date}
        >
          <MyCardHeader className="card-header">
            <MyHeaderText>
              <Link to={dayjs(date).format('#DD')}>
                {dayjs(date).format('ddd DD.MM.YYYY')}
              </Link>
            </MyHeaderText>
            <MyBadge className="badge badge-default">
              <h6>
                {round(sumBy(todaysActivities, 'distance'), 2)}
                km
              </h6>
            </MyBadge>
            <MyBadge className="badge badge-default">
              <h6>
                {formatDuration(sumBy(todaysActivities, 'duration'))}
              </h6>
            </MyBadge>
          </MyCardHeader>
          <MyCardBody className="card-body">
            {todaysActivities.reverse().map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </MyCardBody>
        </ScrollToElementOnHashChange>
      )) }
      <Pagination>
        {Object.entries(activitiesGroupedByMonth).map(([key, val]) => (
          <MyButton
            key={key}
            className={`btn btn-${key === month ? 'purple' : 'secondary'}`}
            to={`/activities/${key}`}
          >
            {dayjs(val[0].date).format('MMM YYYY')}
          </MyButton>
        )).reverse()}
      </Pagination>
    </>
  )
}

export default ActivitiesOverview

const MyCardHeader = styled.div`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`

const MyCardBody = styled.div`
  padding-bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    display: block;
  }
`

const MyBadge = styled.span`
  h6 { margin-bottom: 0 };
  margin-left: .25rem;
`

const MyButton = styled(Link)`
  margin-top: .5rem;
  &:not(:last-child) {
    margin-right: .5rem;
  }
`

const Pagination = styled.div``
