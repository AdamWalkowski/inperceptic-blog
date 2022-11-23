import { useStore } from '../app/state/store';
import { storeReferrals, storeServices, storeTools } from '../modules/about/about-reducer';
import { useOffersLoader } from '../modules/about/use-offers-loader';
import { useReferralsLoader } from '../modules/about/use-referrals-loader';
import { useToolsLoader } from '../modules/about/use-tools-loader';
import { storeArticles } from '../modules/articles/articles-reducer';
import { useArticlesLoader } from '../modules/articles/use-articles-loader';
import { storeProjects } from '../modules/projects/projects-reducer';
import { useProjectsLoader } from '../modules/projects/use-projects-loader';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface IStateLoader {}

export const StateLoader: React.FC<IStateLoader> = () => {
  const dispatch = useDispatch();

  const isServicesLoaded = useStore((state) => state.about.isServicesLoaded);
  const loadedServices = useOffersLoader();

  const isReferralsLoaded = useStore((state) => state.about.isReferralsLoaded);
  const loadedReferrals = useReferralsLoader();

  const isToolsLoaded = useStore((state) => state.about.isToolsLoaded);
  const loadedTools = useToolsLoader();

  const isArticlesLoaded = useStore((state) => state.articles.isLoaded);
  const loadedArticles = useArticlesLoader();

  const isProjectsLoaded = useStore((state) => state.projects.isLoaded);
  const loadedProjects = useProjectsLoader();

  useEffect(() => {
    dispatch(storeServices(loadedServices));
  }, [isServicesLoaded]);

  useEffect(() => {
    dispatch(storeReferrals(loadedReferrals));
  }, [isReferralsLoaded]);

  useEffect(() => {
    dispatch(storeTools(loadedTools));
  }, [isToolsLoaded]);

  useEffect(() => {
    dispatch(storeArticles(loadedArticles));
  }, [isArticlesLoaded]);

  useEffect(() => {
    dispatch(storeProjects(loadedProjects));
  }, [isProjectsLoaded]);

  return null;
};
