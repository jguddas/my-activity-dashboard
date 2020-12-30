import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'tabler-react'

const BackButton = ({ to }) => (
  <Button
    icon="arrow-left"
    prefix="fe"
    color="secondary"
    RootComponent={Link}
    to={to}
  >
    Go Back
  </Button>
)

export default BackButton
