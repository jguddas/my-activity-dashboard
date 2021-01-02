import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton.js'

import splitMatchers from '../utils/splitMatchers.js'

const MatchedActivitiesButton = ({ activity, activities }) => {
  if (
    activities.some((_activity) => (
      _activity.id !== activity.id
      && (splitMatchers.matched(activity, _activity)).length
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
