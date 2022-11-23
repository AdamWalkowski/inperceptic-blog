import { IGatsbyNode } from '../../app';

import { graphql, useStaticQuery } from 'gatsby';

import { Company, IReferralData, Quote } from './about-reducer';

export interface IReferralNode extends IGatsbyNode {
  firstname: string;
  lastname: string;
  role: string;
  pictureUrl: string;
  company: Company;
  quote: Quote;
}

export function useReferralsLoader(): IReferralData[] | undefined {
  const data = useStaticQuery(
    graphql`
      {
        allReferralsYaml {
          nodes {
            id
            firstname
            lastname
            role
            pictureUrl
            company {
              name
              logoUrl
              url
            }
            quote {
              text
              date
            }
          }
        }
      }
    `
  );

  try {
    const nodes: IReferralNode[] = data?.allReferralsYaml?.nodes;

    if (nodes) {
      const referrals: IReferralData[] = nodes.map((node) => ({
        graphId: node.id,
        firstname: node.firstname,
        lastname: node.lastname,
        role: node.role,
        pictureUrl: node.pictureUrl,
        company: node.company,
        quote: node.quote,
      }));
      return referrals;
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
