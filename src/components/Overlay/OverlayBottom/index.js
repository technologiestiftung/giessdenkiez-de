import React, { cloneElement } from 'react';
import styled from 'styled-components';

import OverlayTiles from '../OverlayTiles/';
import OverlayTitle from '../OverlayTitle/';
import content from "../../../assets/content";

const StyledBottom = styled.div`
  opacity: 1;
  height: auto;
  width: 100%;
  background-color: #F7F7F7;
  padding: 40px 0;
`;

const OverlayBottom = p => {
  const {children} = p;
  const { collaborate } = content;

  return (
    <StyledBottom>
      <OverlayTitle content={collaborate.title}/>
      <OverlayTiles content={collaborate.tiles}/>
    </StyledBottom>
  )
}

export default OverlayBottom;