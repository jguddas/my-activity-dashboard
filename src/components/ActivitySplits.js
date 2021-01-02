import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Table, Card } from 'tabler-react'
import { Link } from 'react-router-dom'

import splitMatchers from '../utils/splitMatchers.js'

function ActivitySplits({ activity }) {
  const splits = useSelector((state) => state.Split.splits)

  return (
    <Card>
      <MyCardHeader>
        <MyHeaderText>
          Splits
        </MyHeaderText>
      </MyCardHeader>
      <Table cards striped responsive>
        <Table.Body>
          {splits.map((split) => {
            const matchedSplits = splitMatchers[split.type](split, activity)
            if (!matchedSplits.length) return null
            return (
              <Table.Row
                className="d-block d-md-table-row"
                key={split.id}
              >
                <Table.Col>
                  <Link to={`/split/${split.id}/${activity.id}`}>
                    {split.name}
                  </Link>
                </Table.Col>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </Card>
  )
}

export default ActivitySplits

const MyCardHeader = styled(Card.Header)`
  display: flex;
`

const MyHeaderText = styled.h4`
  margin-bottom: 0;
  flex-grow: 1;
`
