import { GatsbyPage, PageType } from '../app';
import { InPercepticState } from '../app/state/store';
import { PageLayout } from '../layout/PageLayout';
import { PageSection } from '../layout/PageSection';
import ArticlesList from '../modules/articles/components/ArticlesList';
import { Device, margin } from '../styles/theme';
import styled from 'styled-components';

import type { HeadFC } from 'gatsby';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Title = styled.p`
  margin-top: ${margin.veryBig};
  font-weight: bold;

  @media ${Device.mobile} {
    display: none;
  }
`;

const InfoSection = styled.div`
  display: flex;
  margin: ${margin.normal} 0;

  div {
    flex: 1;
  }

  @media ${Device.mobile} {
    margin: ${margin.normal} ${margin.normal};
    flex-direction: column;
  }
`;

interface INewsPage extends GatsbyPage {}

export type Action = { type: 'setTag'; payload: string[] } | { type: 'setPage'; payload: number };

const HomePage: React.FC<INewsPage> = ({ location }) => {
  const articlesData = useSelector((state: InPercepticState) => state.articles.articles);
  // const queryParams = useArticlesParams();
  // const tags = getUniqueTags(articlesData);

  // useEffect(() => {
  //   window.document.getElementById('layout-container')?.scrollTo(0, 0);
  // }, [articlesData]);

  // const navigateToPage = (page: number) => {
  //   const url = buildArticlesQuery({
  //     ...queryParams,
  //     page,
  //   });
  //   if (url) {
  //     navigate(url);
  //   }
  // };
  // const selectTag = (tag: string) => {
  //   const url = buildArticlesQuery({
  //     ...queryParams,
  //     tags: [...queryParams.tags, tag],
  //   });
  //   if (url) {
  //     navigate(url);
  //   }
  // };
  // const unselectTag = (tag: string) => {
  //   const url = buildArticlesQuery({
  //     ...queryParams,
  //     tags: queryParams.tags.filter((t: string) => t != tag),
  //   });
  //   if (url) {
  //     navigate(url);
  //   }
  // };

  return (
    <PageLayout location={location} page={PageType.HOME}>
      {/* <SEOMetadata pageTitle="Aktualności" /> */}
      {/* <Placeholder text="Aktualności" /> */}

      {/* <PageSection>{articlesData && <ArticlesList articles={articlesData} />}</PageSection> */}
    </PageLayout>
  );
};

export default HomePage;

export const Head: HeadFC = () => <title>Home Page</title>;
