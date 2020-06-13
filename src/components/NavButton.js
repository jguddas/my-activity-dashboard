import * as React from 'react'
import styled from 'styled-components'
import { withRouter, NavLink } from 'react-router-dom'
import { Dropdown, Button } from 'tabler-react'

const navItems = [
  { name: 'My Activities', link: '/activities' },
]

const NavButton = () => (
  <MyDropdown
    triggerContent={<Button icon="menu" prefix="fe" />}
    isNavLink
    position="bottom-start"
    arrow
    items={navItems.map(({ name, link }) => (
      <Dropdown.Item
        RootComponent={withRouter(NavLink)}
        to={link}
      >
        {name}
      </Dropdown.Item>
    ))}
  />
)

export default NavButton

const MyDropdown = styled(Dropdown)`
  .dropdown-toggle {
    padding-left: 0;
  }
  .dropdown-toggle::after {
    content: unset;
  }
  .dropdown-menu {
    margin-top: 7px;
    margin-left: 12px;
    z-index: 9999;
  }
  .dropdown-item {
    line-height: 1.5;
  }
`
