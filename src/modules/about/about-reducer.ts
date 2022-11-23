import { IReduxData } from '../../app';
import { createSlice } from '@reduxjs/toolkit';

export interface IServiceData extends IReduxData {
  name: string;
  description: string;
  tag: string;
  color: string;
}

export type Company = {
  name: string;
  logoUrl: string;
  url: string;
};

export type Quote = {
  text: string;
  date: string;
};

export interface IReferralData extends IReduxData {
  firstname: string;
  lastname: string;
  role: string;
  pictureUrl: string;
  company: Company;
  quote: Quote;
}

export interface IToolData extends IReduxData {
  name: string;
  logoUrl: string;
  description: string;
  url: string;
}

export interface IAboutState {
  services?: IServiceData[];
  isServicesLoaded: boolean;
  referrals?: IReferralData[];
  isReferralsLoaded: boolean;
  tools?: IToolData[];
  isToolsLoaded: boolean;
}

const initialState: IAboutState = {
  isServicesLoaded: false,
  isReferralsLoaded: false,
  isToolsLoaded: false,
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    storeServices: (state: IAboutState, action: any) => {
      state.services = action.payload;
      state.isServicesLoaded = action.payload !== null;
    },
    storeReferrals: (state: IAboutState, action: any) => {
      state.referrals = action.payload;
      state.isReferralsLoaded = action.payload !== null;
    },
    storeTools: (state: IAboutState, action: any) => {
      state.tools = action.payload;
      state.isToolsLoaded = action.payload !== null;
    },
  },
});

export const { storeServices, storeReferrals, storeTools } = aboutSlice.actions;

export default aboutSlice.reducer;
