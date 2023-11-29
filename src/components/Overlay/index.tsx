import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTop from './OverlayTop';
import OverlayBottom from './OverlayBottom';
import { OverlayAside } from './OverlayAside';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background-color: white;
  box-shadow: ${p => p.theme.boxShadow};
  z-index: 3;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    width: 100%;
    height: 100%;
    box-shadow: none;
    overflow-y: auto;
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
  max-height: calc(100vh - 80px);
  display: grid;
  grid-template:
    'intro aside'
    'sales sales';
  grid-template-columns: 1fr 300px;
  grid-template-rows: 1fr auto;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Overlay: FC = () => (
  <StyledOverlayWrapper>
    <StyledWrapper>
      <Wrapper>
        <OverlayTop />
        <OverlayAside />
        <OverlayBottom />
      </Wrapper>
    </StyledWrapper>
  </StyledOverlayWrapper>
);

export default Overlay;
