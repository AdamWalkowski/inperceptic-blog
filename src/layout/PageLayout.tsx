import { IBrowserLocation, PageType, ReactChildren } from '../app';
import { selectActivePage, storeBrowserLocation } from '../app/state/app-reducer';
import { InPercepticState } from '../app/state/store';
import '../styles/pola-web.css';
import { Device, desktopHeaderHeight, mobileHeaderHeight } from '../styles/theme';
import ErrorBoundary from '../utils/error-boundary';
import styled from 'styled-components';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageFooter } from './PageFooter';
import { PageHeader } from './PageHeader';
import { StateLoader } from './StateLoader';

type ILayoutStyles = {
  marginTop?: string;
};

interface IPageLayout {
  page: PageType;
  location?: Location;

  styles?: ILayoutStyles;
  children: ReactChildren;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const PageContent = styled.main<ILayoutStyles>`
  width: 100%;
  margin: 0 auto;
  margin-top: ${(props) => props.marginTop || 0};
  padding: 0;
  flex: 1 1 auto;

  @media ${Device.mobile} {
    padding-top: ${mobileHeaderHeight};
  }
  @media ${Device.desktop} {
    padding-top: ${desktopHeaderHeight};
  }
`;

export const PageLayout: React.FC<IPageLayout> = ({ location, page, children, styles }) => {
  const activePage = useSelector((state: InPercepticState) => state.app.activePage);
  const dispatch = useDispatch();

  const updatePage = (location?: Location) => {
    if (location) {
      const locationParams: IBrowserLocation = {
        hash: location.hash,
        search: location.search,
        host: location.host,
        hostname: location.hostname,
        href: location.href,
        origin: location.origin,
        pathname: location.pathname,
        port: location.port,
        protocol: location.protocol,
      };
      dispatch(storeBrowserLocation(locationParams));
      dispatch(selectActivePage(page));
    }
  };

  useEffect(() => {
    updatePage(location);
  }, []);

  const isMenuExpanded = false;

  return (
    <ErrorBoundary scope="page-layout">
      <StateLoader />
      <LayoutContainer id="layout-container">
        <PageHeader activePage={activePage} isMenuExpanded={isMenuExpanded} onExpand={() => {}} />
        <PageContent {...styles}>{children}</PageContent>
        <PageFooter />
      </LayoutContainer>
    </ErrorBoundary>
  );
};
