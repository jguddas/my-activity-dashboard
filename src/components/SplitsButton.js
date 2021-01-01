import React from 'react'
import { Link } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton.js'

const SplitsButton = ({ to = '/splits' }) => (
  <PageHeaderButton
    RootComponent={Link}
    to={to}
    icon="scissors"
  >
    Splits
  </PageHeaderButton>
)

export default SplitsButton
