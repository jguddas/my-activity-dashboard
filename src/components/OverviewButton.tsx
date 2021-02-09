import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

type Props = {
  to?: string
}

const OverviewButton = ({ to = '/activities' }:Props):JSX.Element => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="calendar"
  >
    Overview
  </PageHeaderButton>
)

export default OverviewButton
