import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTile from './OverlayTile';
import { CollaborationItem } from '../../../assets/content';

const Wrapper = styled.div`
  display: grid;
  column-gap: 1.5rem;
  row-gap: 2rem;
  margin: 0 40px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${p => p.theme.screens.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const OverlayTiles: FC<{ tiles: CollaborationItem[] }> = ({ tiles }) => {
  return (
    <Wrapper>
      {tiles.map(col => (
        <OverlayTile key={col.title} collaborationItem={col}></OverlayTile>
      ))}
    </Wrapper>
  );
};

export default OverlayTiles;
