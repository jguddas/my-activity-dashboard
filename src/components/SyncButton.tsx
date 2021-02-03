/* eslint-disable camelcase */
import React from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from '../store'

import { loadGpx } from '../actions/ActivityActions'
import { getActivities, getActivityStream } from '../actions/StravaActions'

import mapStava from '../utils/mapStrava'

import PageHeaderButton from './PageHeaderButton'

function SyncButton({ disabled, setLoading: setLoadingProps }) {
  const [{ isLoading, loading }, setLoadingState] = React.useState({
    isLoading: false,
    loading: 0,
  })
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)
  const activitiesFromStore = useSelector((state) => state.Activity.activities)

  if (!accessToken) return null

  const setLoading = (_isLoading, value) => {
    setLoadingState({ isLoading: _isLoading, loading: value })
    setLoadingProps(_isLoading, value)
  }

  const myDispatch = (action) => dispatch(action)
    .then(({ payload, error }) => {
      if (!error) return payload
      setLoading(false)
      return Promise.reject(error)
    })

  return (
    <PageHeaderButton
      icon="refresh-cw"
      className={activitiesFromStore.length ? '' : 'btn-purple'}
      disabled={isLoading || disabled}
      onClick={() => (async () => {
        setLoading(true, 0)
        const isNew = (activity) => (
          activitiesFromStore.every(({ id }) => id !== `${activity.id}`)
        )
        const activities = (await myDispatch(getActivities({
          before: dayjs().unix(),
          after: (
            activitiesFromStore[0]?.startTime
              ? dayjs(activitiesFromStore[0].startTime).add(-7, 'days').unix()
              : dayjs().add(-2, 'month').startOf('month').unix()
          ),
          page: 1,
          per_page: 100,
        }))).filter(isNew)
        for (let i = activities.length - 1; i >= 0; i -= 1) {
          const activity = activities[i]
          setLoading(true, i)
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
        setLoading(false, 0)
      })().catch((err) => alert(err.message))}
    >
      {isLoading && loading > 0 ? `Sync (${loading})` : 'Sync'}
    </PageHeaderButton>
  )
}

export default SyncButton
