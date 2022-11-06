import { Device } from '../../styles/theme';
import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

interface INavbarMenu {}

const NavbarLayout = styled.nav`
  @media ${Device.mobile} {
    display: none;
  }

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  flex: 1 1 100%;
  align-items: center;
  height: 100%;
`;

export const NavbarMenu: React.FC<INavbarMenu> = ({ children }) => (
  <NavbarLayout className="navbar-manu">
    <Link to="/">
      <h1>LOGO</h1>
    </Link>
    {children}
  </NavbarLayout>
);
