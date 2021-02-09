import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

type Props = { to: string }

const ActivityButton = ({ to }: Props):JSX.Element => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="navigation"
  >
    Activity
  </PageHeaderButton>
)

export default ActivityButton
