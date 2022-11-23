import { IGatsbyNode } from '../../app';

import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import { IProjectShortData } from './projects-reducer';

export interface IProjectNode extends IGatsbyNode {
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
    short: string;
    picture: string;
    url: string;
    techs: string[];
    type: string;
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

export function useProjectsLoader(): IProjectShortData[] | undefined {
  const data = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//projects//" } }, limit: 1000) {
          nodes {
            id
            wordCount {
              paragraphs
              sentences
              words
            }
            fields {
              slug
            }
            frontmatter {
              title
              short
              picture
              url
              techs
              type
            }
          }
        }
      }
    `
  );

  try {
    const nodes: IProjectNode[] = data?.allMarkdownRemark?.nodes;
    if (nodes) {
      const projects: IProjectNode[] = nodes.map((node) => ({
        graphId: node.id,
        title: node.frontmatter.title,
        short: node.frontmatter.short,
        picture: node.frontmatter.picture,
        url: node.frontmatter.url,
        techs: node.frontmatter.techs,
        type: node.frontmatter.type,
        slug: node.fields.slug,
      }));

      return projects;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
