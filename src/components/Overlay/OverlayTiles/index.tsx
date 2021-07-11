import React from 'react';
import styled from 'styled-components';

import OverlayTile from './OverlayTile';
import { CollaborationItem } from '../../../assets/content';

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0 40px;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const OverlayTiles: React.FC<{ tiles: CollaborationItem[] }> = ({ tiles }) => {
  return (
    <Wrapper>
      {tiles.map(col => (
        <OverlayTile key={col.title} collaborationItem={col}></OverlayTile>
      ))}
    </Wrapper>
  );
};

export default OverlayTiles;
