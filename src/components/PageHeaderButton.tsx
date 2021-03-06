/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'

export type PageHeaderButtonOwnProps = {
  icon: string;
  className?: string;
}

export type PageHeaderButtonProps<
  E extends React.ElementType,
> = PolymorphicComponentProps<E, PageHeaderButtonOwnProps>

const defaultElement = 'button'

function PageHeaderButton<E extends React.ElementType = typeof defaultElement>({
  children,
  className,
  icon,
  ...props
}: PageHeaderButtonProps<E>): JSX.Element {
  // The `as` prop may be overridden by the passed props
  return (
    <Box
      as={defaultElement}
      className={`btn btn-secondary ${className !== undefined ? className : 'ml-1'}`}
      {...props}
    >
      <i className={`fe fe-${icon} mr-md-2`} />
      <span className="d-none d-md-inline">
        {children}
      </span>
    </Box>
  )
}

export default PageHeaderButton
