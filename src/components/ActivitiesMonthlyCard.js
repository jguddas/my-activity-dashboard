import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { sumBy, groupBy, range } from 'lodash'
import { Link } from 'react-router-dom'
import {
  Card, Button, Badge, colors,
} from 'tabler-react'
import { ResponsiveLineCanvas } from '../nivo-line.esm.js'

import { drawLine, drawEndCap } from '../utils/lineUtils.js'

import ActivityFooter from './ActivityFooter.js'

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

function ActivitiesCard({ activities, month }) {
  const activitiesGroupedByMonth = React.useMemo(() => groupBy(
    activities,
    ({ date }) => dayjs(date).format('YYYY-MM'),
  ), [activities])
  const currentActivities = activitiesGroupedByMonth[month]
  if (!currentActivities) return null
  const currentMonth = dayjs(currentActivities[0].date)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getTimeSeriesData = React.useMemo(() => {
    const activitiesGroupedByDate = groupBy(activities, 'date')
    return (date) => range(0, date.daysInMonth())
      .map((val) => date.date(val).format('YYYY-MM-DD'))
      .map((val) => sumBy(activitiesGroupedByDate[val] || [], 'distance'))
      .reduce((acc, val, idx) => (acc ? [...acc, (acc[idx - 1] || 0) + val] : [val]), [])
      .map((y, x) => ({ x, y }))
  }, [activities])

  return (
    <>
      <Card>
        <MyCardHeader>
          <MyButton
            icon="chevron-left"
            prefix="fe"
            RootComponent={Link}
            to={`/activities/${currentMonth.add(-1, 'month').format('YYYY-MM')}`}
            disabled={!activitiesGroupedByMonth[currentMonth.add(-1, 'month').format('YYYY-MM')]}
          />
          <MyHeaderText>
            {currentMonth.format('MMM YYYY')}
          </MyHeaderText>
          <MyButton
            icon="chevron-right"
            prefix="fe"
            RootComponent={Link}
            to={`/activities/${currentMonth.add(1, 'month').format('YYYY-MM')}`}
            disabled={!activitiesGroupedByMonth[currentMonth.add(1, 'month').format('YYYY-MM')]}
          />
        </MyCardHeader>
        <div style={{ height: '10rem' }}>
          <ResponsiveLineCanvas
            data={[{
              id: 2,
              data: getTimeSeriesData(currentMonth.add(-2, 'month')),
            }, {
              id: 1,
              data: getTimeSeriesData(currentMonth.add(-1, 'month')),
            }, {
              id: 0,
              data: getTimeSeriesData(currentMonth)
                .slice(0, (dayjs().format('YYYY-MM') === month ? dayjs().date() : currentMonth.daysInMonth()) + 1),
            }]}
            colors={[
              colors['gray-lighter'],
              colors.gray,
              colors.purple,
            ]}
            layers={[drawLine, drawEndCap]}
            lineWidth={3}
            curve="monotoneX"
            margin={{ top: 5, bottom: 5, right: 5 }}
            isInteractive={false}
          />
        </div>
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
  &.disabled {
    cursor: default;
    opacity: 0;
  }
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
