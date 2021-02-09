import React from 'react'
import { useHistory } from 'react-router-dom'

import PageHeaderButton from './PageHeaderButton'

const BackButton = ():JSX.Element => {
  const history = useHistory()
  return (
    <PageHeaderButton
      onClick={() => history.goBack()}
      className=""
      icon="arrow-left"
    >
      Back
    </PageHeaderButton>
  )
}

export default BackButton
