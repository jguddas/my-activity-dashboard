import React from 'react'
import { Page } from 'tabler-react'

import NavButton from './NavButton.js'
import ScrollToTopOnLocationChange from './ScrollToTopOnLocationChange.js'

function SegmentsPage() {
  return (
    <Page.Content>
      <ScrollToTopOnLocationChange />
      <Page.Header>
        <NavButton />
        <Page.Title className="mr-auto">
          My Segments
        </Page.Title>
      </Page.Header>
      ...
    </Page.Content>
  )
}

export default SegmentsPage
