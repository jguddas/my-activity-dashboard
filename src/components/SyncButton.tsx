/* eslint-disable camelcase */
import React from 'react'
import dayjs from 'dayjs'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from '../store'

import { loadGpx } from '../actions/ActivityActions'
import { getActivities, getActivityStream } from '../actions/StravaActions'

import mapStava from '../utils/mapStrava'

import PageHeaderButton from './PageHeaderButton'

import { Activity } from '../types/activity'

type Props = {
  disabled?: boolean
  setLoading: (isLoading:boolean, loading:number) => null
}

function SyncButton({
  disabled = false,
  setLoading: setLoadingProps,
}: Props):JSX.Element|null {
  const [{ isLoading, loading }, setLoadingState] = React.useState({
    isLoading: false,
    loading: 0,
  })
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)
  const activitiesFromStore = useSelector((state) => state.Activity.activities)

  if (!accessToken) return null

  const setLoading = (_isLoading:boolean, value:number) => {
    setLoadingState({ isLoading: _isLoading, loading: value })
    setLoadingProps(_isLoading, value)
  }

  const handleError = (error: any) => {
    setLoading(false, 0)
    return Promise.reject(error)
  }

  return (
    <PageHeaderButton
      icon="refresh-cw"
      className={activitiesFromStore.length ? '' : 'btn-purple'}
      disabled={isLoading || disabled}
      onClick={() => (async () => {
        setLoading(true, 0)
        const isNew = (activity:Activity) => (
          activitiesFromStore.every(({ id }) => id !== `${activity.id}`)
        )
        const activities = (await dispatch(getActivities({
          before: dayjs().unix(),
          after: (
            activitiesFromStore[0]?.startTime
              ? dayjs(activitiesFromStore[0].startTime).add(-7, 'day').unix()
              : dayjs().add(-2, 'month').startOf('month').unix()
          ),
          page: 1,
          perPage: 100,
        })).then(unwrapResult).catch(handleError)).filter(isNew)
        for (let i = activities.length - 1; i >= 0; i -= 1) {
          const activity = activities[i]
          setLoading(true, i)
          if (activity.start_latlng) {
            // eslint-disable-next-line no-await-in-loop
            const streams = await dispatch(getActivityStream({
              id: activity.id,
              keys: ['time', 'distance', 'latlng', 'altitude'],
              keyByType: true,
            })).then(unwrapResult).catch(handleError)
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
