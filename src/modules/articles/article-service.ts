import { graphql, useStaticQuery } from 'gatsby';

export const ArticleService = {
  getAllArticles: () =>
    useStaticQuery(
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
    ),
};
