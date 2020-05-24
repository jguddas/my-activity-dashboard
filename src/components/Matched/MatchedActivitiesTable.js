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
        <Table.Row>
          <th onClick={() => toggleSort('startTime')}>
            Name - Date
            {sortMethod === 'startTime' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th onClick={() => toggleSort('distance')}>
            Distance
            {sortMethod === 'distance' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th onClick={() => toggleSort('speed')}>
            Average Speed
            {sortMethod === 'speed' && activities.length > 1 ? (
              <Icon
                prefix="fe"
                name={sortOrder ? 'chevron-down' : 'chevron-up'}
              />
            ) : null}
          </th>
          <th onClick={() => toggleSort('duration')}>
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
          <Table.Row key={id}>
            <Table.Col>
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
            <Table.Col>
              <span className="pr-1">
                {round(distance, 2)}
                km
              </span>
              <Badge color="default">
                {(matchedActivities[0].distance - distance) > 0 ? '-' : '+'}
                {round(Math.abs(matchedActivities[0].distance - distance), 2)}
                km
              </Badge>
            </Table.Col>
            <Table.Col>
              <span className="pr-1">
                {round(speed, 1)}
                km/h
              </span>
              <Badge color="default">
                {(matchedActivities[0].speed - speed) > 0 ? '-' : '+'}
                {round(Math.abs(matchedActivities[0].speed - speed), 1)}
                km/h
              </Badge>
            </Table.Col>
            <Table.Col>
              <span className="pr-1">{formatDuration(duration)}</span>
              <Badge color="default" className="color-info">
                {(matchedActivities[0].duration - duration) > 0 ? '-' : '+'}
                {formatDuration(Math.abs(matchedActivities[0].duration - duration))}
              </Badge>
            </Table.Col>
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
