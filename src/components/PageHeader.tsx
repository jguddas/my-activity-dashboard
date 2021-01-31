import React from 'react'
import styled from 'styled-components'

const PageHeader = ({ title, children }) => (
  <div className="page-header">
    <MyPageTitle className="page-title">
      {title}
    </MyPageTitle>
    <div>
      {children}
    </div>
  </div>
)

export default PageHeader

const MyPageTitle = styled.div`
  width: 0;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`