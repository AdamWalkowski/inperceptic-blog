import { IBrowserLocation, PageType } from '..';
import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  initialized: boolean;
  location?: IBrowserLocation;
  activePage: PageType;
  flags: any;
}

const initialState: IAppState = {
  initialized: false,
  activePage: PageType.HOME,
  flags: {},
};

const applicationSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializeApp: (state: IAppState) => {
      state.initialized = true;
    },
    loadBrowserLocation: (state: IAppState, action) => {
      state.location = action.payload;
    },
    selectActivePage: (state: IAppState, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { initializeApp, loadBrowserLocation, selectActivePage } = applicationSlice.actions;

export default applicationSlice.reducer;
