import { createSlice } from '@reduxjs/toolkit';

export interface IServiceData {
  name: string;
  description: string;
}

export interface IAboutState {
  services: IServiceData[];
}

const initialState: IAboutState = {
  services: [],
};

const aboutSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadAbout: (state: IAboutState, action: any) => {
      state.services = action.payload;
    },
  },
});

export const { loadAbout } = aboutSlice.actions;

export default aboutSlice.reducer;
