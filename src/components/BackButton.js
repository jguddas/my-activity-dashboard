import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Icon } from 'tabler-react'

const BackButton = ({ className, history }) => (
  <Button
    className={className}
    color="secondary"
    onClick={() => history.goBack()}
  >
    <Icon name="arrow-left" prefix="fe" className="mr-md-2" />
    <span className="d-none d-md-inline">
      Back
    </span>
  </Button>
)

export default withRouter(BackButton)
