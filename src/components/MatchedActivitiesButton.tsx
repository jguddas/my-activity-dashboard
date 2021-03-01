import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

import matchActivity from '../utils/matchActivity'
import getDistance from '../utils/getDistance'

import { Activity } from '../types/activity'

type Props = {
  activity: Activity
  activities: Activity[]
}

const MatchedActivitiesButton = ({ activity, activities }: Props):JSX.Element|null => {
  const isRoundTrip = !(activity.startpt || activity.endpt)
    || getDistance(activity.startpt, activity.endpt) <= 0.5
  if (
    !isRoundTrip
    && activities.some((_activity) => (
      _activity.id !== activity.id
      && activity.trkpts
      && _activity.trkpts
      && (matchActivity({
        activity,
        type: 'matched',
        name: activity.name,
      }, _activity)).length
    ))
  ) {
    return (
      <PageHeaderButton
        RootComponent={Link}
        to={`/matched-activities/${activity.id}`}
        icon="list"
      >
        Matched
      </PageHeaderButton>
    )
  }
  return null
}

export default MatchedActivitiesButton
