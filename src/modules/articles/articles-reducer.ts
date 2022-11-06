import { createSlice } from '@reduxjs/toolkit';

export interface IArticleData {
  title: string;
  subTitle: string;
  category: string;
}

export interface IArticlesState {
  isLoaded: boolean;
  articles: IArticleData[];
}

const initialState: IArticlesState = {
  isLoaded: false,
  articles: [],
};

const articlesSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadArticles: (state: IArticlesState, action: any) => {
      state.isLoaded = true;
      state.articles = action.payload;
    },
  },
});

export const { loadArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
