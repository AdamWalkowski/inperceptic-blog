import { appDispatcher } from '../app/state/app-dispatcher';
import { InPercepticState } from '../app/state/store';
import { IServiceNode } from '../modules/about';
import { aboutDispatcher } from '../modules/about/about-dispatcher';
import { AboutService } from '../modules/about/about-service';
import { IArticleNode } from '../modules/articles';
import { ArticleService } from '../modules/articles/article-service';
import { articlesDispatcher } from '../modules/articles/articles-dispatcher';

import { graphql, useStaticQuery } from 'gatsby';
import { useEffect } from 'react';
import { connect } from 'react-redux';

interface IStateLoader {
  isArticlesLoaded?: boolean;
  initApp?: () => void;
  loadAbout?: (node: IServiceNode[]) => void;
  loadArticles?: (edges: IArticleNode[]) => void;
}

const Loader = (props: IStateLoader) => {
  const bootApplication = async () => {
    if (props.initApp) {
      await props.initApp();
    }
  };

  useEffect(() => {
    bootApplication();
  }, []);

  const servicesResult = AboutService.getAllServices();
  if (servicesResult?.allPersonalYaml?.nodes && props.loadAbout) {
    props.loadAbout(servicesResult.allPersonalYaml.nodes);
  }

  const articlesResult = ArticleService.getAllArticles();
  if (!props.isArticlesLoaded && articlesResult?.allMarkdownRemark?.nodes && props.loadArticles) {
    const data = articlesResult.allMarkdownRemark.nodes;
    data.sort((a: IArticleNode, b: IArticleNode) => {
      return Date.parse(b.fields.prefix) - Date.parse(a.fields.prefix);
    });
    props.loadArticles(data);
  }

  return null;
};

export const StateLoader = connect(
  (state: InPercepticState) => ({
    isArticlesLoaded: state.articles.isLoaded,
  }),
  {
    initApp: appDispatcher.initialize,
    loadArticles: articlesDispatcher.loadArticles,
    loadAbout: aboutDispatcher.loadAbout,
  }
)(Loader);
