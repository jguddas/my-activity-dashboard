import React from 'react'
import { Table } from 'tabler-react'

const SplitsTable = ({ splits, onClick }) => (
  <Table cards striped responsive>
    <Table.Body>
      {splits.map(({ id, name }) => (
        <Table.Row
          onClick={() => onClick && onClick(id)}
          style={{ cursor: onClick ? 'pointer' : 'normal' }}
          className="d-block d-md-table-row"
          key={id}
        >
          <Table.Col>
            {name}
          </Table.Col>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default SplitsTable
