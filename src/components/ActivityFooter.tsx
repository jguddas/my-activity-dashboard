import React from 'react'
import styled from 'styled-components'
import isFinite from 'lodash/isFinite'
import round from 'lodash/round'

import formatDuration from '../utils/formatDuration'

type Props = {
  distance: number
  speed: number
  duration: number
}

function ActivityFooter({ distance, speed, duration }: Props):JSX.Element {
  return (
    <MyCardBody className="card-body">
      {isFinite(distance) && (
        <MyRow>
          <MyRowText>Distance</MyRowText>
          <div>
            <MyBadge className="badge badge-default">
              {round(distance, 2).toFixed(2)}
              km
            </MyBadge>
          </div>
        </MyRow>
      )}
      {isFinite(speed) && (
        <MyRow>
          <MyRowText>Average Speed</MyRowText>
          <div>
            <MyBadge className="badge badge-default">
              {round(speed, 1).toFixed(1)}
              km/h
            </MyBadge>
          </div>
        </MyRow>
      )}
      {isFinite(duration) && (
        <MyRow>
          <MyRowText>Elapsed Time</MyRowText>
          <div>
            <MyBadge className="badge badge-default">
              {formatDuration(duration)}
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

const MyBadge = styled.span`
  min-width: 60px;
`

const MyRow = styled.div`
  display: flex;
`

const MyCardBody = styled.div`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`
