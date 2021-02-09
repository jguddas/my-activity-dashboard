import React from 'react'
import loadable from '@loadable/component'
import { useHistory } from 'react-router-dom'
import { useSelector } from '../store'

import PageWrapper from './PageWrapper'
import PageHeader from './PageHeader'
import UploadButton from './UploadButton'
import SyncButton from './SyncButton'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange'

import { Activity } from '../types/activity'

const ActivitiesOverview = loadable(() => import(
  /* webpackChunkName: "activities-overview" */
  './ActivitiesOverview'
))
const ActivitiesMonthlyCard = loadable(() => import(
  /* webpackChunkName: "activities-monthly-card" */
  './ActivitiesMonthlyCard'
))

type Props = {
  activities: Activity[]
  month: string
}

function ActivitiesPage({ activities, month }:Props):JSX.Element {
  const history = useHistory()
  const [max, setMax] = React.useState(0)
  const [{ isLoading, loading }, setLoadingState] = React.useState({
    isLoading: false,
    loading: 0,
  })
  React.useEffect(() => {
    setMax((_max) => {
      if (isLoading) {
        return loading > _max ? loading : _max
      }
      return 0
    })
  }, [loading, isLoading, setMax])
  const setLoading = (_isLoading:boolean, value:number) => {
    if (value && !isLoading) {
      history.replace({ hash: '' })
    }
    setLoadingState({ isLoading: _isLoading, loading: value })
  }
  const isLogedIn = useSelector((state) => !!state.Strava.athlete)

  return (
    <PageWrapper>
      <ScrollToTopOnLocationChange />
      <PageHeader title="My Activities">
        <SyncButton
          disabled={isLoading}
          setLoading={setLoading}
        />
        <UploadButton
          disabled={isLoading}
          setLoading={setLoading}
        />
      </PageHeader>
      {activities.length && !isLoading ? (
        <div className="row flex-column-reverse flex-md-row">
          <div className="col col-12 col-sm-12 col-md-9">
            <ActivitiesOverview
              activities={activities}
              month={month}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-3">
            <ActivitiesMonthlyCard
              activities={activities}
              month={month}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h4 className="text-muted">
            {
              isLoading
                ? 'Loading...'
                : `Upload or ${isLogedIn ? '' : 'Login and '}Sync activities to get started.`
            }
          </h4>
          {isLoading && loading > 0 && max > 0 && (
            <div className="progress progress-sm">
              <div
                className="progress-bar bg-purple"
                style={{
                  transition: 'unset',
                  width: `${((max - loading + 1) / max) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

export default ActivitiesPage
