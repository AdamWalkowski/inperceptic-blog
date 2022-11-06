import { IBrowserLocation, PageType } from '..';
import { Dispatch } from 'redux';

import { initializeApp, loadBrowserLocation, selectActivePage } from './app-reducer';
import { InPercepticState } from './store';

export const appDispatcher = {
  initialize: () => async (dispatch: Dispatch, getState: () => InPercepticState) => {
    await dispatch(initializeApp());
  },

  loadBrowserLocation: (location: Location) => async (dispatch: Dispatch, getState: () => InPercepticState) => {
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
    await dispatch(loadBrowserLocation(locationParams));
  },

  selectActivePage: (type: PageType) => async (dispatch: Dispatch, getState: () => InPercepticState) => {
    await dispatch(selectActivePage(type));
  },
};
