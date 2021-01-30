import React from 'react'
import { withRouter } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

const BackButton = ({ history }) => (
  <PageHeaderButton
    onClick={() => history.goBack()}
    className=""
    icon="arrow-left"
  >
    Back
  </PageHeaderButton>
)

export default withRouter(BackButton)
