import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `inperceptic-blog`,
    description: `InPerceptic Blog | Adam Walkowski`,
    author: `Adam Walkowski`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    // images for articles
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `article-images`,
        path: `${__dirname}/content/articles/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/app/state/store',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        cleanupOnClient: true,
        windowKey: '__PRELOADED_STATE__',
      },
    },

    // YAML
    `gatsby-transformer-yaml-full`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/personal`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/personal/images`,
      },
    },
  ],
};

export default config;
