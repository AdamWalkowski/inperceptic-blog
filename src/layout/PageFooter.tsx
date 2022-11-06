import { Device, color, padding, pageWidth } from '../styles/theme';
import styled from 'styled-components';

import React from 'react';

const FooterContainer = styled.footer`
  background-color: ${color.background.dark};
  color: ${color.text.light};
  margin: 0 auto;
  width: 100%;
  padding-top: ${padding.big};
  padding-bottom: ${padding.big};

  .footer-content {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;

    @media ${Device.Desktop} {
      max-width: ${pageWidth};
    }
  }
`;

type IPageFooter = {};

export const PageFooter: React.FC<IPageFooter> = ({}) => {
  return <FooterContainer></FooterContainer>;
};
