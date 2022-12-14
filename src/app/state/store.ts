import aboutReducer, { IAboutState } from '../../modules/about/about-reducer';
import articlesReducer, { IArticlesState } from '../../modules/articles/articles-reducer';
import projectsReducer, { IProjectsState } from '../../modules/projects/projects-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';

import { useSelector } from 'react-redux';

import appReducer, { IAppState } from './app-reducer';

export type IStateSelector<TResult> = (state: InPercepticState) => TResult;
export const useStore = <TResult>(selector: IStateSelector<TResult>) =>
  useSelector<InPercepticState, TResult>(selector);

export interface InPercepticState {
  app: IAppState;
  about: IAboutState;
  articles: IArticlesState;
  projects: IProjectsState;
}

export interface IAction extends AnyAction {
  type: string;
  payload?: any;
  meta?: any;
}

export interface IActionReducer<TState> {
  [actionName: string]: Reducer<TState, IAction>;
}

export type Validator<T> = (value: T) => string | undefined;

const store = configureStore({
  reducer: {
    app: appReducer,
    about: aboutReducer,
    articles: articlesReducer,
    projects: projectsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default (preloadedState: InPercepticState) => {
  return store;
};
