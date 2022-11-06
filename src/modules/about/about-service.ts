import { graphql, useStaticQuery } from 'gatsby';

export const AboutService = {
  getAllServices: () =>
    useStaticQuery(
      graphql`
        {
          allPersonalYaml {
            nodes {
              id
              name
              description
            }
          }
        }
      `
    ),
};
