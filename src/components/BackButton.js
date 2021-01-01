import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'tabler-react'

const BackButton = ({ history }) => (
  <Button
    color="secondary"
    onClick={() => history.goBack()}
    className="mr-1"
    icon="arrow-left"
  />
)

export default withRouter(BackButton)
