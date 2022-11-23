import { IArticleNode } from '..';
import { PageType } from '../../../app';
import { InPercepticState } from '../../../app/state/store';
import { PageLayout } from '../../../layout/PageLayout';
import { PageSection } from '../../../layout/PageSection';
import SEOMetadata from '../../../utils/seo';
import styled from 'styled-components';

import React from 'react';
import { connect } from 'react-redux';

import { ArticleHeader } from './ArticleHeader';

const Content = (props: any) => {
  const { html, children } = props;

  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  } else {
    return <div>{children}</div>;
  }
};

interface IArticlePage {
  article: IArticleNode;
  location?: Location;
  slug?: string;
}

const ArticlePage = (props: IArticlePage) => {
  const { article } = props;
  const { frontmatter } = article;
  const { title, subTitle, category } = frontmatter;
  const date = article.fields.prefix;
  const html = article.html;

  return (
    <PageLayout location={props.location} page={PageType.ARTICLE}>
      {/* <SEOMetadata pageTitle={title} image={fluid.src} /> */}
      <PageSection>
        <ArticleHeader title={title} subTitle={subTitle} date={date} fluid={null} category={category} />
      </PageSection>
      <PageSection>
        <Content html={html} />
      </PageSection>
    </PageLayout>
  );
};

export default connect(
  (state: InPercepticState) => ({
    location: state.app.location,
  }),
  {}
)(ArticlePage);
