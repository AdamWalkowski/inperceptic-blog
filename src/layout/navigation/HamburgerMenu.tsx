import { Device, color, mobileHeaderHeight, padding } from '../../styles/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { Link } from 'gatsby';
import React, { createRef } from 'react';

const HamburgerLayout = styled.nav`
  background: ${color.background.white};
  @media ${Device.desktop} {
    display: none;
  }

  flex: 1 1 100%;

  height: 100%;

  .nav-items {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .nav-item {
      font-weight: bolder;
      cursor: pointer;
    }
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${padding.small};

  height: ${mobileHeaderHeight};

  .menu-icon {
    cursor: pointer;
  }
`;

const Items = styled.div`
  overflow: hidden;
  height: 0;
  transition: height 0.5s;
  &.open {
    height: 21rem;
  }
`;

interface IHamburgerMenu {
  expanded: boolean;
  onExpand: (expanded: boolean) => void;
}

export const HamburgerMenu: React.FC<IHamburgerMenu> = ({ expanded, children, onExpand }) => {
  const itemsRef = createRef<HTMLDivElement>();

  const handleOpen = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    onExpand(!expanded);
    const items = itemsRef.current;
    items?.classList.toggle('open');
  };

  return (
    <HamburgerLayout className="hamburger-menu">
      <Navbar>
        <Link to="/">
          <h1>LOGO</h1>
        </Link>
        <FontAwesomeIcon icon={faBars} onClick={handleOpen} className="menu-icon" size="2x" />
      </Navbar>
      <Items ref={itemsRef} className="nav-items">
        {children}
      </Items>
    </HamburgerLayout>
  );
};
