import { IGatsbyNode } from '../../app';

import { graphql, useStaticQuery } from 'gatsby';

import { IToolData } from './about-reducer';

export interface IToolNode extends IGatsbyNode {
  name: string;
  logoUrl: string;
  description: string;
  url: string;
}

export function useToolsLoader(): IToolData[] | undefined {
  const data = useStaticQuery(
    graphql`
      {
        allToolsYaml {
          nodes {
            id
            name
            logoUrl
            description
            url
          }
        }
      }
    `
  );

  try {
    const nodes: IToolNode[] = data?.allToolsYaml.nodes;
    if (nodes) {
      const tools: IToolData[] = nodes.map((node) => ({
        graphId: node.id,
        name: node.name,
        url: node.url,
        logoUrl: node.logoUrl,
        description: node.description,
      }));

      return tools;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
