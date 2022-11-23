import { IGatsbyNode } from '../../app';

import { graphql, useStaticQuery } from 'gatsby';

import { IServiceData } from './about-reducer';

export interface IServiceNode extends IGatsbyNode {
  name: string;
  description: string;
  tag: string;
  color: string;
}

export function useOffersLoader(): IServiceData[] | undefined {
  const data = useStaticQuery(
    graphql`
      {
        allPersonalYaml {
          nodes {
            id
            tag
            name
            description
            color
          }
        }
      }
    `
  );

  try {
    const nodes: IServiceNode[] = data?.allPersonalYaml?.nodes;
    if (nodes) {
      const services: IServiceData[] = nodes.map((node) => ({
        graphId: node.id,
        tag: node.tag,
        name: node.name,
        description: node.description,
        color: node.color,
      }));

      return services;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
