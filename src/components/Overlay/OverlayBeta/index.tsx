import React from 'react';
import styled from 'styled-components';

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

const OverlayBeta = () => {
  return (
    <BetaNote>
      <span>BETA</span>
    </BetaNote>
  );
};

export default OverlayBeta;
