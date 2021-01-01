import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton.js'

const OverviewButton = ({ to }) => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="calendar"
  >
    Overview
  </PageHeaderButton>
)

export default OverviewButton
