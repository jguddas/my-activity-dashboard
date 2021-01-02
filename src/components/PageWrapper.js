import React from 'react'
import styled from 'styled-components'
import { Page, Container } from 'tabler-react'

import BackButton from './BackButton.js'
import LoginButton from './LoginButton.js'
import OverviewButton from './OverviewButton.js'
import SplitsButton from './SplitsButton.js'

const PageWrapper = ({ children }) => (
  <Page>
    <Page.Main>
      <div className="header py-4">
        <MyContainer>
          <div className="d-inline-block">
            <BackButton />
            <OverviewButton />
            <SplitsButton />
          </div>
          <div className="d-inline-block">
            <LoginButton />
          </div>
        </MyContainer>
      </div>
      <Page.Content>
        {children}
      </Page.Content>
    </Page.Main>
  </Page>
)

export default PageWrapper

const MyContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`
