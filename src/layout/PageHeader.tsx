import { PageLinkData, PageType } from '../app';
import { Device, color, desktopHeaderHeight, pageWidth } from '../styles/theme';
import styled from 'styled-components';

import React from 'react';

import { HamburgerMenu } from './navigation/HamburgerMenu';
import { NavItem } from './navigation/NavItem';
import { NavbarMenu } from './navigation/NavbarMenu';

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  background: ${color.background.white};
  box-shadow: 0 1px 10px ${color.background.secondary};

  .header-content {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    max-width: ${pageWidth};
  }

  @media ${Device.mobile} {
    .navbar-menu {
      display: none;
    }
  }
  @media ${Device.desktop} {
    height: ${desktopHeaderHeight};
    .hamburger-menu {
      display: none;
    }
  }
`;

interface IPageHeader {
  activePage: PageType;
  isMenuExpanded: boolean;
  onExpand: (expanded: boolean) => void;
}

export const PageHeader = (props: IPageHeader) => {
  const pageLinks: PageLinkData[] = [
    { type: PageType.HOME, label: 'Home', url: '/' },
    { type: PageType.ABOUT, label: 'About', url: '/about' },
  ];

  const navItems = pageLinks.map((link) => {
    return <NavItem key={link.type} data={link} activePage={props.activePage} />;
  });

  return (
    <HeaderContainer>
      <div className="header-content">
        <NavbarMenu>{navItems}</NavbarMenu>
        <HamburgerMenu expanded={props.isMenuExpanded} onExpand={props.onExpand}>
          {navItems}
        </HamburgerMenu>
      </div>
    </HeaderContainer>
  );
};
