import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'tabler-react'

const BackButton = ({ to, className }) => (
  <Button
    className={className}
    color="secondary"
    RootComponent={Link}
    to={to}
  >
    <Icon name="arrow-left" prefix="fe" className="mr-md-2" />
    <span className="d-none d-md-inline">
      Go Back
    </span>
  </Button>
)

export default BackButton
