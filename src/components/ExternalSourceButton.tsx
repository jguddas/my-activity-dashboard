import React from 'react'

import PageHeaderButton from './PageHeaderButton'

type Props = { to: string }

const ExternalSourceButton = ({ to }:Props):JSX.Element => (
  <PageHeaderButton
    as="a"
    href={to}
    target="_blank"
    icon="external-link"
  >
    Source
  </PageHeaderButton>
)

export default ExternalSourceButton
