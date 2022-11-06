import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface IArticleNode {
  id: string;
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
