import { IGatsbyNode } from '../../app';

import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import { IArticleShortData } from './articles-reducer';

export interface IArticleNode extends IGatsbyNode {
  html: any;
  wordCount: {
    paragraphs: number;
    sentences: number;
    words: number;
  };
  fields: {
    prefix: string;
    slug: string;
  };
  frontmatter: {
    title: string;
    subTitle: string;
    category: string;
    cover: {
      extension: string;
      name: string;
      childImageSharp: {
        id: string;
        fluid: {
          src: string;
        };
        gatsbyImageData: IGatsbyImageData;
      };
      relativePath: string;
    };
  };
}

export function useArticlesLoader(): IArticleShortData[] | undefined {
  const data = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//articles//" } }, limit: 1000) {
          nodes {
            id
            wordCount {
              paragraphs
              sentences
              words
            }
            fields {
              prefix
              slug
            }
            frontmatter {
              title
              subTitle
              category
            }
          }
        }
      }
    `
  );

  try {
    const nodes: IArticleNode[] = data?.allMarkdownRemark?.nodes;
    if (nodes) {
      const articles: IArticleShortData[] = nodes
        .sort((a: IArticleNode, b: IArticleNode) => {
          return Date.parse(b.fields.prefix) - Date.parse(a.fields.prefix);
        })
        .map((node) => ({
          graphId: node.id,
          title: node.frontmatter.title,
          subTitle: node.frontmatter.subTitle,
          category: node.frontmatter.category,
          slug: node.fields.slug,
          date: node.fields.prefix,
        }));

      return articles;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
