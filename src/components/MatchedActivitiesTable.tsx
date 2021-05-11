import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import round from 'lodash/round'
import sortBy from 'lodash/sortBy'

import colors from '../colors'
import formatDuration from '../utils/formatDuration'

import { SplitMatch } from '../types/split'

type Props = {
  activity?: SplitMatch
  activities: SplitMatch[]
  linkBase?: string
}
type ColumnName = 'startTime' | 'distance' | 'speed' | 'duration'

function MatchedActivitiesTable({ activities, activity, linkBase = '' }:Props):JSX.Element {
  const [sortMethod, setSortMethod] = useState<ColumnName>('startTime')
  const [sortOrder, setSortOder] = useState(false)

  const toggleSort = (name:ColumnName) => (
    name === sortMethod
      ? setSortOder((preSortOrder) => !preSortOrder)
      : setSortMethod(name)
  )

  const matchedActivities = sortBy(activities, 'duration')
    .map((val, idx) => ({ ...val, rank: idx + 1 }))

  return (
    <div className="table-responsive">
      <table className="table card-table table-striped">
        <thead>
          <tr className="d-block d-md-table-row">
            <th
              style={activities.length > 1 ? { userSelect: 'none', cursor: 'pointer' } : {}}
              className="d-block d-md-table-cell pl-4 pl-md-5"
              onClick={() => toggleSort('startTime')}
            >
              Name - Date
              <i className={`fe fe-chevron-${sortOrder ? 'down' : 'up'} mr-2 ${sortMethod === 'startTime' && activities.length > 1 ? '' : 'opacity-0'}`} />
            </th>
            <th
              style={activities.length > 1 ? { userSelect: 'none', cursor: 'pointer' } : {}}
              className="d-block d-md-table-cell pl-4 pl-md-3"
              onClick={() => toggleSort('distance')}
            >
              Distance
              <i className={`fe fe-chevron-${sortOrder ? 'down' : 'up'} mr-2 ${sortMethod === 'distance' && activities.length > 1 ? '' : 'opacity-0'}`} />
            </th>
            <th
              style={activities.length > 1 ? { userSelect: 'none', cursor: 'pointer' } : {}}
              className="d-block d-md-table-cell pl-4 pl-md-3"
              onClick={() => toggleSort('speed')}
            >
              Average Speed
              <i className={`fe fe-chevron-${sortOrder ? 'down' : 'up'} mr-2 ${sortMethod === 'speed' && activities.length > 1 ? '' : 'opacity-0'}`} />
            </th>
            <th
              style={activities.length > 1 ? { userSelect: 'none', cursor: 'pointer' } : {}}
              className="d-block d-md-table-cell pl-4 pl-md-3"
              onClick={() => toggleSort('duration')}
            >
              Elapsed Time
              <i className={`fe fe-chevron-${sortOrder ? 'down' : 'up'} mr-2 ${sortMethod === 'duration' && activities.length > 1 ? '' : 'opacity-0'}`} />
            </th>
          </tr>
        </thead>
        <tbody>
          {(
            sortOrder
              ? sortBy(matchedActivities, sortMethod)
              : sortBy(matchedActivities, sortMethod).reverse()
          ).map(({ id, name, duration, distance, speed, date, rank }) => (
            <tr className="d-block d-md-table-row" key={id}>
              <td className="d-block d-md-table-cell">
                <MyRankBadge
                  className="badge badge-default mr-1"
                  style={id === activity?.id ? { background: colors.purple, color: 'white' } : {}}
                >
                  {rank}
                </MyRankBadge>
                <Link to={`${linkBase}${id}`}>
                  {`${name} - ${dayjs(date).format('DD.MM.YYYY')}`}
                </Link>
              </td>
              <MyTableCol className="pl-5 pl-md-3">
                <span className="pr-lg-1 d-block d-lg-inline">
                  {round(distance, 2).toFixed(2)}
                  km
                </span>
                <span className="badge badge-default">
                  {(matchedActivities[0].distance - distance) > 0 ? '-' : '+'}
                  {round(Math.abs(matchedActivities[0].distance - distance), 2).toFixed(2)}
                  km
                </span>
              </MyTableCol>
              <MyTableCol className="text-center text-md-left">
                <span className="pr-lg-1 d-block d-lg-inline">
                  {round(speed, 1).toFixed(2)}
                  km/h
                </span>
                <span className="badge badge-default">
                  {(matchedActivities[0].speed - speed) > 0 ? '-' : '+'}
                  {round(Math.abs(matchedActivities[0].speed - speed), 1).toFixed(2)}
                  km/h
                </span>
              </MyTableCol>
              <MyTableCol className="text-right text-md-left">
                <span className="pr-lg-1 d-block d-lg-inline">{formatDuration(duration)}</span>
                <span className="badge badge-default">
                  {(matchedActivities[0].duration - duration) > 0 ? '-' : '+'}
                  {formatDuration(Math.abs(matchedActivities[0].duration - duration))}
                </span>
              </MyTableCol>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MatchedActivitiesTable

const MyRankBadge = styled.span`
  min-width: 1.8rem;
`

const MyTableCol = styled.td`
  width: 33.3333%;
  display: inline-block;
  @media (min-width: 768px) {
    display: table-cell;
    width: unset;
  }
`
