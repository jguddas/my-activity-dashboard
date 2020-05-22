import React, { useState } from 'react'
import C3Chart from 'react-c3js'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { sumBy, groupBy, range } from 'lodash'
import {
  Card, Button, Badge, colors,
} from 'tabler-react'

import ActivityFooter from '../Activity/ActivityFooter.js'

function ActivitiesDetailsCard({ activities, month, color }) {
  return (
    <Card>
      <MyCardBody>
        <div>
          <MyColorLedgendBadge color={color} />
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
    </Card>
  )
}

function ActivitiesCard({ activities }) {
  const activitiesGroupedByMonth = groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  )
  const activitiesGroupedByDate = groupBy(activities, 'date')
  const [state, setState] = useState(0)
  const activityMonths = Object.values(activitiesGroupedByMonth)
  const currentActivities = activityMonths[state]
  const currentMonth = dayjs(currentActivities[0].date)

  const getTimeSeriesData = (date) => range(0, date.daysInMonth())
    .map((val) => date.date(val).format('YYYY-MM-DD'))
    .map((val) => sumBy(activitiesGroupedByDate[val] || [], 'distance'))
    .reduce((acc, val, idx) => (acc ? [...acc, (acc[idx - 1] || 0) + val] : [val]), [])

  return (
    <>
      <Card>
        <MyCardHeader>
          <MyButton
            icon="chevron-left"
            prefix="fe"
            onClick={() => setState(state + 1)}
            disabled={!activityMonths[state + 1]}
          />
          <MyHeaderText>
            {currentMonth.format('MMM YYYY')}
          </MyHeaderText>
          <MyButton
            icon="chevron-right"
            prefix="fe"
            onClick={() => setState(state - 1)}
            disabled={!activityMonths[state - 1]}
          />
        </MyCardHeader>
        <MyChart
          style={{ height: '10rem' }}
          key={currentMonth.format('YYYY-MM')}
          data={{
            columns: [
              ['currentMonthFill', ...getTimeSeriesData(currentMonth).slice(0, currentMonth.daysInMonth())],
              ['currentMonthStroke', ...getTimeSeriesData(currentMonth).slice(0, currentMonth.daysInMonth())],
              ['oneMonthAgo', ...getTimeSeriesData(currentMonth.add(-1, 'month'))],
              ['twoMonthsAgo', ...getTimeSeriesData(currentMonth.add(-2, 'month'))],
            ].reverse(),
            type: 'line',
            colors: {
              currentMonthFill: colors.purple,
              currentMonthStroke: 'black',
              oneMonthAgo: colors.gray,
              twoMonthsAgo: colors['gray-lighter'],
            },
          }}
          point={{ show: false }}
          legend={{ show: false }}
          axis={{ y: { show: false }, x: { show: false } }}
        />
      </Card>
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
        color={colors['gray-lighter']}
      />
    </>
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

const MyChart = styled(C3Chart)`
  * { fill: none };
  .c3-lines {
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .c3-lines-currentMonthFill { stroke-width: 3; }
  .c3-lines-currentMonthStroke { stroke-width: 5; }
`

const MyColorLedgendBadge = styled(Badge)`
  background-color: ${({ color }) => colors[color] || color};
  display: inline-block !important;
  vertical-align: middle;
  margin-top: -2px;
  width: 1rem;
  height: 1rem;
`

const MyCardBody = styled(Card.Body)`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`

const MyColorLedgendText = styled.span`
  font-weight: 600;
  margin-left: .5rem;
`
