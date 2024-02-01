import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTop from './OverlayTop';
import { useActions } from '../../state/unistore-hooks';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
  position: relative;
  overflow-y: auto;
  background-color: white;
  box-shadow: ${p => p.theme.boxShadow};
  z-index: 3;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
`;

const OverlayOverlay = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: transparent;
  z-index: 2;
  cursor: pointer;
  border: none;
  outline: none;
`;

const StyledOverlayWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  max-height: calc(100vh - 40px);
  display: grid;
  grid-template:
    'intro'
    'sales';
  grid-template-columns: 1fr;
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

const Overlay: FC = () => {
  const { closeOverlay } = useActions();

  return (
    <StyledOverlayWrapper>
      <OverlayOverlay aria-hidden='true' onClick={closeOverlay} />
      <StyledWrapper>
        <Wrapper>
          <OverlayTop />
        </Wrapper>
      </StyledWrapper>
    </StyledOverlayWrapper>
  );
};

export default Overlay;
