import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { sortBy, round } from 'lodash'
import {
  Table, Badge, Icon, colors,
} from 'tabler-react'

import formatDuration from '../../formatDuration.js'

function MatchedActivitiesTable({ activities, activity }) {
  const [sortMethod, setSortMethod] = useState('startTime')
  const [sortOrder, setSortOder] = useState(false)

  const toggleSort = (name) => (
    name === sortMethod
      ? setSortOder((preSortOrder) => !preSortOrder)
      : setSortMethod(name)
  )

  const matchedActivities = sortBy(activities, 'duration')
    .map((val, idx) => ({ ...val, rank: idx + 1 }))

  return (
    <Table cards striped responsive>
      <Table.Header>
        <Table.Row className="d-block d-md-table-row">
          <th
            className="d-block d-md-table-cell pl-4 pl-md-5"
            onClick={() => toggleSort('startTime')}
          >
            Name - Date
            {sortMethod === 'startTime' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th
            className="d-block d-md-table-cell pl-4 pl-md-3"
            onClick={() => toggleSort('distance')}
          >
            Distance
            {sortMethod === 'distance' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th
            className="d-block d-md-table-cell pl-4 pl-md-3"
            onClick={() => toggleSort('speed')}
          >
            Average Speed
            {sortMethod === 'speed' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th
            className="d-block d-md-table-cell pl-4 pl-md-3"
            onClick={() => toggleSort('duration')}
          >
            Elapsed Time
            {sortMethod === 'duration' ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {(
          sortOrder
            ? sortBy(matchedActivities, sortMethod)
            : sortBy(matchedActivities, sortMethod).reverse()
        ).map(({
          id, name, duration, distance, speed, date, rank,
        }) => (
          <Table.Row className="d-block d-md-table-row" key={id}>
            <Table.Col className="d-block d-md-table-cell">
              <MyRankBadge
                color={id === activity.id ? 'purple' : 'default'}
                className="mr-1"
              >
                {rank}
              </MyRankBadge>
              <Link to={`/activity/${id}`}>
                {`${name} - ${dayjs(date).format('DD.MM.YYYY')}`}
              </Link>
            </Table.Col>
            <MyTableCol className="pl-5 pl-md-3">
              <span className="pr-lg-1 d-block d-lg-inline">
                {round(distance, 2)}
                km
              </span>
              <Badge color="default">
                {(matchedActivities[0].distance - distance) > 0 ? '-' : '+'}
                {round(Math.abs(matchedActivities[0].distance - distance), 2)}
                km
              </Badge>
            </MyTableCol>
            <MyTableCol className="text-center text-md-left">
              <span className="pr-lg-1 d-block d-lg-inline">
                {round(speed, 1)}
                km/h
              </span>
              <Badge color="default">
                {(matchedActivities[0].speed - speed) > 0 ? '-' : '+'}
                {round(Math.abs(matchedActivities[0].speed - speed), 1)}
                km/h
              </Badge>
            </MyTableCol>
            <MyTableCol className="text-right text-md-left">
              <span className="pr-lg-1 d-block d-lg-inline">{formatDuration(duration)}</span>
              <Badge color="default" className="color-info">
                {(matchedActivities[0].duration - duration) > 0 ? '-' : '+'}
                {formatDuration(Math.abs(matchedActivities[0].duration - duration))}
              </Badge>
            </MyTableCol>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MatchedActivitiesTable

const MyRankBadge = styled(Badge)`
  background-color: ${({ color }) => colors[color]};
  min-width: 1.8rem;
`

const MyTableCol = styled(Table.Col)`
  width: 33.3333%;
  display: inline-block;
  @media (min-width: 768px) {
    display: table-cell;
    width: unset;
  }
`
