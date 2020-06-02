import React from 'react'
import styled from 'styled-components'

import dayjs from 'dayjs'
import { round, isFinite } from 'lodash'
import { Card, Badge } from 'tabler-react'
import formatDuration from '../utils/formatDuration.js'

function ActivityFooter({
  distance, speed, duration, startTime,
}) {
  return (
    <MyCardBody>
      {isFinite(distance) && (
        <MyRow>
          <MyRowText>Distance</MyRowText>
          <div>
            <MyBadge color="default">
              {round(distance, 2)}
              km
            </MyBadge>
          </div>
        </MyRow>
      )}
      {isFinite(speed) && (
        <MyRow>
          <MyRowText>Average Speed</MyRowText>
          <div>
            <MyBadge color="default">
              {round(speed, 1)}
              km/h
            </MyBadge>
          </div>
        </MyRow>
      )}
      {isFinite(duration) && (
        <MyRow>
          <MyRowText>Elapsed Time</MyRowText>
          <div>
            <MyBadge color="default">
              {formatDuration(duration)}
            </MyBadge>
          </div>
        </MyRow>
      )}
      {isFinite(startTime) && (
        <MyRow>
          <MyRowText>Start Time</MyRowText>
          <div>
            <MyBadge color="default">
              {dayjs(startTime).format('HH:MM:ss')}
            </MyBadge>
          </div>
        </MyRow>
      )}
    </MyCardBody>
  )
}

export default ActivityFooter

const MyRowText = styled.div`
  flex-grow: 1;
`

const MyBadge = styled(Badge)`
  min-width: 60px;
`

const MyRow = styled.div`
  display: flex;
`

const MyCardBody = styled(Card.Body)`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`
