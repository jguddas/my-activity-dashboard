import React from 'react'
import styled from 'styled-components'
import { Page } from 'tabler-react'

import BackButton from './BackButton.js'

const PageHeader = ({ title, children }) => (
  <Page.Header>
    <BackButton />
    <MyPageTitle>
      {title}
    </MyPageTitle>
    <div>
      {children}
    </div>
  </Page.Header>
)

export default PageHeader

const MyPageTitle = styled(Page.Title)`
  width: 0;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`