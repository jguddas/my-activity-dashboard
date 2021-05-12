import React from 'react'
import styled from 'styled-components'
import { useSelector } from '../store'

import BackButton from './BackButton'
import LoginButton from './LoginButton'
import OverviewButton from './OverviewButton'
import SplitsButton from './SplitsButton'
import InstallButton from './InstallButton'

type Props = {
  hideHeader?: boolean,
  children?: React.ReactNode
}

const PageWrapper = ({ children, hideHeader = false }: Props):JSX.Element => {
  const isLoggedIn = useSelector((state) => !!state.Strava.accessToken)
  return (
    <div className="page">
      <div className="page-main">
        {!hideHeader && (
        <div className="header py-4">
          <MyContainer className="container">
            <div className="d-inline-block">
              <BackButton />
              {isLoggedIn ? (
                <>
                  <OverviewButton />
                  <SplitsButton />
                </>
              ) : null}
            </div>
            <div className="d-inline-block">
              <InstallButton />
              <LoginButton />
            </div>
          </MyContainer>
        </div>
        )}
        <div className="page-content">
          <div className="container">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageWrapper

const MyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
