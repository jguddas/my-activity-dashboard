import React from 'react'

import PageHeaderButton from './PageHeaderButton'

const ExternalSourceButton = ({ to }) => (
  <PageHeaderButton
    RootComponent="a"
    href={to}
    target="_blank"
    icon="external-link"
  >
    Source
  </PageHeaderButton>
)

export default ExternalSourceButton
