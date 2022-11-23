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

// const Title = styled.p`
//   margin-top: ${margin.veryBig};
//   font-weight: bold;

//   @media ${Device.mobile} {
//     display: none;
//   }
// `;

// const InfoSection = styled.div`
//   display: flex;
//   margin: ${margin.normal} 0;

//   div {
//     flex: 1;
//   }

//   @media ${Device.mobile} {
//     margin: ${margin.normal} ${margin.normal};
//     flex-direction: column;
//   }
// `;

interface AboutPageProps extends GatsbyPage {}

// export type Action = { type: 'setTag'; payload: string[] } | { type: 'setPage'; payload: number };

const AboutPage: React.FC<AboutPageProps> = ({ location }) => {
  const servicesData = useSelector((state: InPercepticState) => state.about.services);
  const referralsData = useSelector((state: InPercepticState) => state.about.referrals);
  const toolsData = useSelector((state: InPercepticState) => state.about.tools);
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
    <PageLayout location={location} page={PageType.ABOUT}>
      {/* <SEOMetadata pageTitle="Adam Walkowski" /> */}
      {/* <Placeholder text="About me" /> */}
      <PageSection>
        {servicesData &&
          servicesData.map((service) => (
            <div key={service.graphId}>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
            </div>
          ))}
      </PageSection>
      <PageSection>
        {referralsData &&
          referralsData.map((referral) => (
            <div key={referral.graphId}>
              <h2>{`${referral.firstname} ${referral.lastname}`}</h2>
              <p>{referral.quote.text}</p>
            </div>
          ))}
      </PageSection>
      <PageSection>
        {toolsData &&
          toolsData.map((tool) => (
            <div key={tool.graphId}>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
          ))}
      </PageSection>
    </PageLayout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>About Page</title>;
