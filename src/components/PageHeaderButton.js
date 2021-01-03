import React from 'react'

const PageHeaderButton = ({ children, className, icon, RootComponent = 'button', ...props }) => (
  <RootComponent
    className={`btn btn-secondary ${className !== undefined ? className : 'ml-1'}`}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <i className={`fe fe-${icon} mr-md-2`} />
    <span className="d-none d-md-inline">
      {children}
    </span>
  </RootComponent>
)

export default PageHeaderButton
