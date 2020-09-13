/* eslint-disable react/jsx-props-no-spreading, camelcase */
import React from 'react'
import dayjs from 'dayjs'
import { isFinite } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon } from 'tabler-react'

import { loadGpx } from '../actions/ActivityActions.js'
import { getActivities, getActivityStream } from '../actions/StravaActions.js'

import mapStava from '../utils/mapStrava.js'

function SyncButton({ disabled, setLoading: setLoadingProps, ...props }) {
  const [loading, setLoadingState] = React.useState()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)
  const activitiesFromStore = useSelector((state) => state.Activity.activities)

  if (!accessToken) return null

  const setLoading = (val) => {
    setLoadingState(val)
    setLoadingProps(val)
  }

  const myDispatch = (action) => dispatch(action)
    .then(({ payload, error }) => {
      if (!error) return payload
      setLoading(false)
      return Promise.reject(error)
    })

  return (
    <Button
      color="secondary"
      {...props}
      disabled={loading || disabled}
      onClick={() => (async () => {
        setLoading(true)
        const activities = await myDispatch(getActivities({
          before: dayjs().unix(),
          after: (
            activitiesFromStore[0]?.startTime
              ? dayjs(activitiesFromStore[0].startTime).unix()
              : dayjs().add(-1, 'month').startOf('month').unix()
          ),
          page: 1,
          per_page: 100,
        }))
        for (let i = activities.length - 1; i >= 0; i -= 1) {
          const activity = activities[i]
          setLoading(i)
          if (activity.start_latlng) {
            // eslint-disable-next-line no-await-in-loop
            const streams = await myDispatch(getActivityStream({
              id: activity.id,
              keys: 'time,distance,latlng,altitude',
              key_by_type: true,
            }))
            dispatch(loadGpx(mapStava({ ...activity, streams })))
          } else {
            dispatch(loadGpx(mapStava(activity)))
          }
        }
        setLoading(false)
      })().catch((err) => alert(err.message))}
    >
      <Icon name="refresh-cw" prefix="fe" className="mr-md-2" />
      <span className="d-none d-md-inline">
        {loading && isFinite(loading) ? `Sync (${loading})` : 'Sync'}
      </span>
    </Button>
  )
}

export default SyncButton
