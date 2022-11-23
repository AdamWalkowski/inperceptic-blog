import { ICollectionState, IReduxData } from '../../app';
import { createSlice } from '@reduxjs/toolkit';

export interface IProjectShortData extends IReduxData {
  title: string;
  subTitle: string;
  category: string;
  date: string;
  slug: string;
}

export interface IProjectsState extends ICollectionState<IProjectShortData> {}

const initialState: IProjectsState = {
  isLoaded: false,
  entries: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    storeProjects: (state: IProjectsState, action: any) => {
      state.isLoaded = true;
      state.entries = action.payload;
    },
  },
});

export const { storeProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
