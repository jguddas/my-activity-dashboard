import React from 'react'
import { useSelector } from 'react-redux'
import { Page, Card, Table } from 'tabler-react'

import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'

function SegmentsPage() {
  const segments = useSelector((state) => state.Segment.segments)

  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <Page.Header>
        <NavButton />
        <Page.Title className="mr-auto">
          My Segments
        </Page.Title>
      </Page.Header>
      {segments.length ? (
        <Card>
          <Table cards striped responsive>
            <Table.Body>
              {segments.map(({ id, name }) => (
                <Table.Row className="d-block d-md-table-row" key={id}>
                  <Table.Col>
                    {name}
                  </Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      ) : (
        <div className="text-center">
          <h4 className="text-muted">
            ...
          </h4>
        </div>
      )}
    </Page.Content>
  )
}

export default SegmentsPage
