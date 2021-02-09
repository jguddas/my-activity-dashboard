import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

type Props = {
  to?: string
}

const SplitsButton = ({ to = '/splits' }:Props):JSX.Element => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="scissors"
  >
    Splits
  </PageHeaderButton>
)

export default SplitsButton
