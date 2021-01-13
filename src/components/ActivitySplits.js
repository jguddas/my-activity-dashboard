import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import splitMatchers from '../utils/splitMatchers.js'

function ActivitySplits({ activity }) {
  const splits = useSelector((state) => state.Split.splits)

  const rows = splits.map((split) => {
    const matchedSplits = splitMatchers[split.type](split, activity)
    if (!matchedSplits.length) return null
    return (
      <tr
        className="d-block d-md-table-row"
        key={split.id}
      >
        <td>
          <Link to={`/split/${split.id}/${activity.id}`}>
            {split.name}
          </Link>
        </td>
      </tr>
    )
  }).filter(Boolean)

  if (!rows.length) return null

  return (
    <div className="card">
      <MyCardHeader className="card-header">
        <MyHeaderText>
          Splits
        </MyHeaderText>
      </MyCardHeader>
      <div className="table-responsive">
        <table className="table card-table table-striped">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ActivitySplits

const MyCardHeader = styled.div`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
