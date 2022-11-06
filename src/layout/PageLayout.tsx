import { PageType } from '../app';
import { appDispatcher } from '../app/state/app-dispatcher';
import { InPercepticState } from '../app/state/store';
import '../styles/pola-web.css';
import { Device, desktopHeaderHeight, mobileHeaderHeight } from '../styles/theme';
import ErrorBoundary from '../utils/error-boundary';
import styled from 'styled-components';

import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';

import { PageFooter } from './PageFooter';
import { PageHeader } from './PageHeader';
import { StateLoader } from './StateLoader';

const connector = connect(
  (state: InPercepticState) => {
    const { app } = state;
    return {
      activePage: app.activePage,
      isMenuExpanded: false,
    };
  },
  {
    loadBrowserLocation: appDispatcher.loadBrowserLocation,
    selectActivePage: appDispatcher.selectActivePage,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

type ILayoutStyles = {
  marginTop?: string;
};

type IPageLayout = ReduxProps & {
  page: PageType;
  location?: Location;

  styles?: ILayoutStyles;
  children: JSX.Element | JSX.Element[];
};

const LayoutContainer = styled(CustomScrollbarDiv)`
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

const Layout: React.FC<IPageLayout> = ({
  location,
  page,
  activePage,
  isMenuExpanded,
  children,
  loadBrowserLocation,
  selectActivePage,
  styles,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    if (location) {
      loadBrowserLocation(location);
      selectActivePage(page);
    }
  }, []);

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

export const PageLayout = connector(Layout);
