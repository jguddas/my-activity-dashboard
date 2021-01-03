import React from 'react'
import styled from 'styled-components'

import BackButton from './BackButton.js'
import LoginButton from './LoginButton.js'
import OverviewButton from './OverviewButton.js'
import SplitsButton from './SplitsButton.js'

const PageWrapper = ({ children }) => (
  <div className="page">
    <div className="page-main">
      <div className="header py-4">
        <MyContainer className="container">
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
      <div className="page-content">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export default PageWrapper

const MyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
