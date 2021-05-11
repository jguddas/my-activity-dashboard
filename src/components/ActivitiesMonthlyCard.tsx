import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import sumBy from 'lodash/sumBy'
import groupBy from 'lodash/groupBy'
import range from 'lodash/range'
import { Link } from 'react-router-dom'

import colors from '../colors'

import LineGraph from './LineGraph'
import ActivityFooter from './ActivityFooter'

import { Activity } from '../types/activity'

type CardProps = {
  activities: Activity[]
  month: dayjs.Dayjs
  color: string
}

function ActivitiesDetailsCard({ activities, month, color }:CardProps) {
  return (
    <div className="card">
      <MyCardBody className="card-body">
        <div>
          <MyColorLedgendBadge
            className="badge"
            color={color}
          />
          <MyColorLedgendText>
            {month.format('MMM YYYY')}
          </MyColorLedgendText>
        </div>
      </MyCardBody>
      <ActivityFooter
        duration={sumBy(activities, 'duration')}
        distance={sumBy(activities, 'distance')}
        speed={sumBy(activities, 'distance') / (sumBy(activities, 'duration') / 3600000)}
      />
    </div>
  )
}

type Props = {
  activities: Activity[]
  month: string
}

function ActivitiesMonthlyCard({ activities, month }: Props):JSX.Element|null {
  const activitiesGroupedByMonth = React.useMemo(() => groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  ), [activities])
  const currentActivities = activitiesGroupedByMonth[month]
  const currentMonth = currentActivities ? dayjs(currentActivities[0].date) : dayjs()

  const activitiesGroupedByDate = React.useMemo(() => groupBy(activities, 'date'), [activities])

  const getTimeSeriesData = React.useCallback(
    (date: dayjs.Dayjs) => range(0, date.daysInMonth())
      .map((val) => date.date(val).format('YYYY-MM-DD'))
      .map((val) => sumBy(activitiesGroupedByDate[val] || [], 'distance'))
      .reduce<number[]>((acc, val, idx) => (acc ? [...acc, (acc[idx - 1] || 0) + val] : [val]), []),
    [activitiesGroupedByDate],
  )

  if (!currentActivities) return null

  return (
    <>
      <div className="card">
        <MyCardHeader className="card-header">
          {activitiesGroupedByMonth[currentMonth.add(-1, 'month').format('YYYY-MM')] ? (
            <Link
              className="btn"
              to={`/activities/${currentMonth.add(-1, 'month').format('YYYY-MM')}`}
            >
              <i className="fe fe-chevron-left" />
            </Link>
          ) : (
            <div className="btn opacity-0" style={{ cursor: 'unset' }} />
          )}
          <MyHeaderText>
            {currentMonth.format('MMM YYYY')}
          </MyHeaderText>
          {activitiesGroupedByMonth[currentMonth.add(1, 'month').format('YYYY-MM')] ? (
            <Link
              className="btn"
              to={`/activities/${currentMonth.add(1, 'month').format('YYYY-MM')}`}
            >
              <i className="fe fe-chevron-right" />
            </Link>
          ) : (
            <div className="btn opacity-0" style={{ cursor: 'unset' }} />
          )}
        </MyCardHeader>
        <div style={{ height: '10rem' }}>
          <LineGraph
            data={[
              getTimeSeriesData(currentMonth).slice(0, (
                dayjs().format('YYYY-MM') === month
                  ? dayjs().date()
                  : currentMonth.daysInMonth()
              ) + 1),
              getTimeSeriesData(currentMonth.add(-1, 'month')),
              getTimeSeriesData(currentMonth.add(-2, 'month')),
            ]}
          />
        </div>
      </div>
      <ActivitiesDetailsCard
        activities={currentActivities}
        month={currentMonth}
        color={colors.purple}
      />
      <ActivitiesDetailsCard
        activities={activitiesGroupedByMonth[currentMonth.add(-1, 'month').format('YYYY-MM')] || []}
        month={currentMonth.add(-1, 'month')}
        color={colors.gray}
      />
      <ActivitiesDetailsCard
        activities={activitiesGroupedByMonth[currentMonth.add(-2, 'month').format('YYYY-MM')] || []}
        month={currentMonth.add(-2, 'month')}
        color={colors.grayLighter}
      />
    </>
  )
}

export default ActivitiesMonthlyCard

const MyHeaderText = styled.h4`
  text-align: center;
  margin-bottom: 0;
  padding: 0 .5rem;
  flex-grow: 1;
`

const MyCardHeader = styled.div`
  padding: .5rem;
`

const MyColorLedgendBadge = styled.span`
  background-color: ${({ color }:{color: string}) => colors[color] || color};
  display: inline-block !important;
  vertical-align: middle;
  margin-top: -2px;
  width: 1rem;
  height: 1rem;
`

const MyCardBody = styled.div`
  padding: .75rem 1rem;
`

const MyColorLedgendText = styled.span`
  font-weight: 600;
  margin-left: .5rem;
`
