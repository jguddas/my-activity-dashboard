import React from 'react'
import { Table } from 'tabler-react'
import { Link } from 'react-router-dom'

const SplitsTable = ({ splits }) => (
  <Table cards striped responsive>
    <Table.Body>
      {splits.map(({ id, name }) => (
        <Table.Row
          className="d-block d-md-table-row"
          key={id}
        >
          <Table.Col>
            <Link to={`/split/${id}`}>
              {name}
            </Link>
          </Table.Col>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default SplitsTable
