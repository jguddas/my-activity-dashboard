import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { round } from 'lodash'
import { Card, Badge } from 'tabler-react'

import ActivityMap from './ActivityMap.js'

import 'tabler-react/dist/Tabler.css'

const padZero = (x) => (parseInt(x, 10) < 10 ? `0${x}` : `${x}`)
const formatDuration = (startTime, endTime) => `${
  padZero(endTime.diff(startTime, 'hour'))
}:${
  padZero(endTime.diff(startTime, 'minute') % 60)
}:${
  padZero(endTime.diff(startTime, 'second') % 60)
}`

function ActivityCard({ activity }) {
  return (
    <Container>
      <MyCard>
        <MyCardHeader>
          <h4>{activity.name}</h4>
        </MyCardHeader>
        <ActivityMap cords={activity.cords} />
        <MyCardBody>
          <MyRow>
            <MyRowText>Date</MyRowText>
            <div>
              <MyBadge color="default">
                {dayjs(activity.date).format('DD.MM.YYYY')}
              </MyBadge>
            </div>
          </MyRow>
          <MyRow>
            <MyRowText>Distance</MyRowText>
            <div>
              <MyBadge color="default">
                {round(activity.distance, 2)}
                km
              </MyBadge>
            </div>
          </MyRow>
          <MyRow>
            <MyRowText>Elapsed Time</MyRowText>
            <div>
              <MyBadge color="default">
                {formatDuration(
                  dayjs(activity.startTime),
                  dayjs(activity.endTime),
                )}
              </MyBadge>
            </div>
          </MyRow>
          <MyRow>
            <MyRowText>Average Speed</MyRowText>
            <div>
              <MyBadge color="default">
                {round(activity.speed, 1)}
                km/h
              </MyBadge>
            </div>
          </MyRow>
        </MyCardBody>
      </MyCard>
    </Container>
  )
}

export default ActivityCard

const MyCard = styled(Card)`
  overflow: hidden;
`

const MyCardHeader = styled(Card.Body)`
  border-bottom: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`

const MyCardBody = styled(Card.Body)`
  border-top: 1px solid rgba(0, 40, 100, 0.12);
  padding: .75rem 1rem;
`

const Container = styled.div`
  display: inline-block;
  width: 200px;
  margin: 5px;
`

const MyRowText = styled.div`
  flex-grow: 1;
`

const MyBadge = styled(Badge)``

const MyRow = styled.div`
  display: flex;
`
