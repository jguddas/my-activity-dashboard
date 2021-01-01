import React from 'react'
import { Button, Icon } from 'tabler-react'

const PageHeaderButton = ({ children, icon, ...props }) => (
  <Button
    className="ml-1"
    color="secondary"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Icon name={icon} prefix="fe" className="mr-md-2" />
    <span className="d-none d-md-inline">
      {children}
    </span>
  </Button>
)

export default PageHeaderButton
