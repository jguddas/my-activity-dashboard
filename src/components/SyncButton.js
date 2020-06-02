/* eslint-disable react/jsx-props-no-spreading, camelcase */
import React from 'react'
import dayjs from 'dayjs'
import { last, isFinite } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'tabler-react'
import { stringify as stringifyQuery } from 'query-string'

import { loadGpx } from '../actions/ActivityActions.js'

import { STRAVA_ACTIVITIES_URL, STRAVA_ACTIVITY_STREAM_URL } from '../constants.js'

const mapStava = ({
  id, name, distance, streams, start_date, elapsed_time,
}) => {
  const trkpts = streams.time.data.map((time, idx) => ([
    streams.latlng.data[idx][0],
    streams.latlng.data[idx][1],
    streams.altitude.data[idx],
    time * 1000,
    streams.distance.data[idx] / 1000,
  ]))

  const startTime = dayjs(start_date)

  return {
    id: `${id}`,
    endTime: startTime.add(elapsed_time, 'seconds').toISOString(),
    startTime: startTime.toISOString(),
    distance: distance / 1000,
    name,
    duration: elapsed_time * 1000,
    date: startTime.format('YYYY-MM-DD'),
    trkpts,
    startpt: trkpts[0],
    endpt: last(trkpts),
    speed: distance / (elapsed_time / 3.6),
  }
}

function SyncButton({ disabled, ...props }) {
  const [loading, setLoading] = React.useState()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)
  const activitiesFromStore = useSelector((state) => state.Activity.activities)

  if (!accessToken) return null

  const getActivities = () => fetch(`${STRAVA_ACTIVITIES_URL}?${stringifyQuery({
    before: dayjs().unix(),
    after: (
      activitiesFromStore[0]?.startTime
        ? dayjs(activitiesFromStore[0].startTime).unix()
        : 0
    ),
    page: 1,
    per_page: 50,
  })}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((res) => res.json())

  const getActivityStream = (id) => fetch(`${
    STRAVA_ACTIVITY_STREAM_URL.replace('%s', id)
  }?${stringifyQuery({
    keys: 'time,distance,latlng,altitude',
    key_by_type: true,
  })}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then((res) => res.json())

  return (
    <Button
      prefix="fe"
      icon="refresh-cw"
      color="secondary"
      {...props}
      disabled={loading || disabled}
      onClick={() => {
        if (props.setLoading) props.setLoading(true)
        setLoading(true)
        getActivities().then((activities) => (activities.filter((activity) => (
          !activitiesFromStore.some(({ id }) => `${activity.id}` === id)
        )))).then((activities) => {
          setLoading(activities.length)
          if (!activities.length && props.setLoading) {
            props.setLoading(false)
          }
          activities.reduce((acc, activity, idx, arr) => acc.then(() => (
            getActivityStream(activity.id).then((streams) => {
              if (streams.time) {
                dispatch(loadGpx(mapStava({ ...activity, streams })))
              }
              const nextLoading = arr.length - idx - 1
              if (props.setLoading && !nextLoading) {
                props.setLoading(false)
              }
              setLoading(nextLoading)
            })
          )), Promise.resolve())
        })
      }}
    >
      {loading && isFinite(loading) ? `Sync (${loading})` : 'Sync'}
    </Button>
  )
}

export default SyncButton
