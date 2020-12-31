import React from 'react'
import dayjs from 'dayjs'

import splitMatchers from '../utils/splitMatchers.js'

import DotGraph from './DotGraph.js'

const SplitsGraph = ({ activities, activity, split, onClick = () => {} }) => {
  const matchedSplits = activities
    .reverse()
    .flatMap((_activity) => splitMatchers[split.type](split, _activity))

  return (
    <DotGraph
      data={matchedSplits.map((matchedSplit) => matchedSplit.value)}
      isInteractive
      selected={!activity ? [] : matchedSplits.reduce((acc, { id }, idx) => (
        activity.id === id
          ? [...acc, idx]
          : acc
      ), [])}
      onClick={(idx) => onClick(matchedSplits[idx].id)}
      format={(val, idx) => (
        <span>
          <strong>
            {dayjs(activities.find(({ id }) => id === matchedSplits[idx].id).date).format('DD.MM.YYYY')}
          </strong>
          &nbsp;
          {matchedSplits[idx].label ?? matchedSplits[idx].value}
        </span>
      )}
    />
  )
}

export default SplitsGraph
