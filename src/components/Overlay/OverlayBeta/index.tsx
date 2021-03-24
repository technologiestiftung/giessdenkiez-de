import React, { FC } from 'react';
import styled from 'styled-components';
import { isDemoMode } from '../../../mocks/mocks-utils';
const BetaNote = styled.div`
  transform: translate(-20px, 0);

  span {
    padding: 5px;
    border-radius: ${p => p.theme.borderRadius};
    font-size: ${p => p.theme.fontSizeM};
    letter-spacing: 1px;
    background-color: ${p => p.theme.colorGreyLight};
  }
`;

const OverlayBeta: FC = () => {
  return (
    <BetaNote>
      <span>BETA{isDemoMode() && ' in DEMO MODE'}</span>
    </BetaNote>
  );
};

export default OverlayBeta;
