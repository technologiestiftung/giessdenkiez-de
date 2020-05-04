import React, { cloneElement } from 'react';
import styled from 'styled-components';

import OverlayTiles from '../OverlayTiles/';
import OverlayTitle from '../OverlayTitle/';
import content from "../../../assets/content";
import Credits from '../../Credits';

const StyledBottom = styled.div`
  opacity: 1;
  height: auto;
  width: 100%;
`;

const CollaborateContainer = styled.div`
  background-color: #F7F7F7;
  padding: 40px 0;
`;

const CreditsContainer = styled.div`
  margin: 40px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    position: relative;
  }

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

const OverlayBottom = p => {
  const {children} = p;
  const { collaborate } = content;

  return (
    <>
      <StyledBottom>
        <CollaborateContainer>
          <OverlayTitle content={collaborate.title}/>
          <OverlayTiles content={collaborate.tiles}/>
        </CollaborateContainer>
        <CreditsContainer>
          <Credits/>
        </CreditsContainer>
      </StyledBottom>
    </>
  )
}

export default OverlayBottom;