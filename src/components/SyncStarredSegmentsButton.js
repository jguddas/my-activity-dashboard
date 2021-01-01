import React from 'react'
import { isFinite } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

import { addSplit } from '../actions/SplitActions.js'
import { getStarredSegments } from '../actions/StravaActions.js'

import PageHeaderButton from './PageHeaderButton.js'

function SyncStarredSegmentsButton({ disabled, setLoading: setLoadingProps }) {
  const [loading, setLoadingState] = React.useState()
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.Strava.accessToken)

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
    <PageHeaderButton
      disabled={loading || disabled}
      icon="refresh-cw"
      onClick={() => (async () => {
        setLoading(true)
        const starredSegments = await myDispatch(getStarredSegments({
          page: 1,
          perPage: 100,
        }))
        for (let i = starredSegments.length - 1; i >= 0; i -= 1) {
          dispatch(addSplit({
            a: starredSegments[i].start_latlng,
            b: starredSegments[i].end_latlng,
            id: starredSegments[i].id,
            name: starredSegments[i].name,
            type: 'aTob',
          }))
        }
        setLoading(false)
      })().catch((err) => alert(err.message))}
    >
      {loading && isFinite(loading) ? `Sync (${loading})` : 'Sync'}
    </PageHeaderButton>
  )
}

export default SyncStarredSegmentsButton
