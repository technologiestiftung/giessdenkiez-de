import React from 'react';
import styled from 'styled-components';

import OverlayClose from './OverlayClose';
import OverlayTop from './OverlayTop';
import OverlayBottom from './OverlayBottom';

const StyledWrapper = styled.div`
  width: 60%;
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: scroll;
  justify-content: center;
  background-color: white;
  box-shadow: ${p => p.theme.boxShadow};
  z-index: 3;

  @media screen and (max-width: ${_p => '600px'}) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
`;

const StyledOverlayWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  max-height: 70vh;

  @media screen and (max-width: ${_p => '600px'}) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
`;

const Overlay: () => JSX.Element = () => {
  return (
    <StyledOverlayWrapper>
      <StyledWrapper>
        <Wrapper>
          <OverlayTop>
            <OverlayClose />
          </OverlayTop>
          <OverlayBottom />
        </Wrapper>
      </StyledWrapper>
    </StyledOverlayWrapper>
  );
};

export default Overlay;
