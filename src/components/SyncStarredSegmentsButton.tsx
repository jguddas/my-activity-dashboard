import React from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from '../store'

import { addSplit } from '../actions/SplitActions'
import { getStarredSegments } from '../actions/StravaActions'

import PageHeaderButton from './PageHeaderButton'

type Props = {
  disabled?: boolean
  setLoading: (isLoading:boolean) => void
}

function SyncStarredSegmentsButton({
  disabled = false,
  setLoading: setLoadingProps,
}: Props):JSX.Element|null {
  const [loading, setLoadingState] = React.useState(false)
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)

  if (!accessToken) return null

  const setLoading = (val:boolean) => {
    setLoadingState(val)
    setLoadingProps(val)
  }

  const handleError = (error: any) => {
    setLoading(false)
    return Promise.reject(error)
  }

  return (
    <PageHeaderButton
      disabled={loading || disabled}
      icon="refresh-cw"
      onClick={() => (async () => {
        setLoading(true)
        const starredSegments = await dispatch(getStarredSegments({
          page: 1,
          perPage: 100,
        })).then(unwrapResult).catch(handleError)
        for (let i = starredSegments.length - 1; i >= 0; i -= 1) {
          dispatch(addSplit({
            a: starredSegments[i].start_latlng,
            b: starredSegments[i].end_latlng,
            id: `${starredSegments[i].id}`,
            name: starredSegments[i].name,
            type: 'aTob',
          }))
        }
        setLoading(false)
      })().catch((err) => {
        if (err instanceof Error) {
          alert(err.message)
        }
      })}
    >
      Sync Starred Segments
    </PageHeaderButton>
  )
}

export default SyncStarredSegmentsButton
