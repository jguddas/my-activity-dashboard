import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

const ActivityButton = ({ to }) => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="navigation"
  >
    Activity
  </PageHeaderButton>
)

export default ActivityButton
