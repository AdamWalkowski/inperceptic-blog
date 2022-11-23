const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf('--') ? slug.indexOf('--') : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? '/' : ''}${slug.substring(shortSlugStart)}`,
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : '',
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ReferralsYaml implements Node {
      firstname: String!
      lastname: String!
      role: String!
      pictureUrl: String
      company: Company
      quote: Quote
    }
    type Company {
      name: String!
      logoUrl: String!
      url: String!
    }
    type Quote {
      text: String!
      date: String!
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//articles//" } }, limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
                prefix
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    console.error(result.errors);
    throw new Error('Unable to fetch pages');
  }

  const articleTemplate = path.resolve('./src/gatsby-templates/article-template.tsx');

  // Create articles
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    const { slug } = edge.node.fields;

    createPage({
      path: slug,
      component: articleTemplate,
      context: {
        slug,
      },
    });
  });
};
