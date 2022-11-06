import { IArticleNode } from '.';
import { InPercepticState } from '../../app/state/store';
import { Dispatch } from 'redux';

import { IArticleData, loadArticles } from './articles-reducer';

export const articlesDispatcher = {
  loadArticles: (gatsbyNodes: IArticleNode[]) => async (dispatch: Dispatch, getState: () => InPercepticState) => {
    const articles: IArticleData[] = gatsbyNodes.map((node) => ({
      title: node.frontmatter.title,
      subTitle: node.frontmatter.subTitle,
      category: node.frontmatter.category,
    }));

    await dispatch(loadArticles(articles));
  },
};
