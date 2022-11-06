import { IServiceNode } from '.';
import { InPercepticState } from '../../app/state/store';
import { Dispatch } from 'redux';

import { IServiceData, loadAbout } from './about-reducer';

export const aboutDispatcher = {
  loadAbout: (gatsbyNodes: IServiceNode[]) => async (dispatch: Dispatch, getState: () => InPercepticState) => {
    const services: IServiceData[] = gatsbyNodes.map((node) => ({
      name: node.name,
      description: node.description,
    }));

    await dispatch(loadAbout(services));
  },
};
