import { IReduxData } from '../../app';
import { createSlice } from '@reduxjs/toolkit';

export interface IArticleShortData extends IReduxData {
  title: string;
  subTitle: string;
  category: string;
  date: string;
  slug: string;
}

export interface IArticlesState {
  isLoaded: boolean;
  articles: IArticleShortData[];
}

const initialState: IArticlesState = {
  isLoaded: false,
  articles: [],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    storeArticles: (state: IArticlesState, action: any) => {
      state.articles = action.payload;
      state.isLoaded = action.payload !== undefined;
    },
  },
});

export const { storeArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
