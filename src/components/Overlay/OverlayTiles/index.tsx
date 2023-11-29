import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTile from './OverlayTile';
import { CollaborationItem } from '../../../assets/content';

const Wrapper = styled.div`
  display: grid;
  column-gap: 1.5rem;
  row-gap: 1rem;
  margin: 0 40px;
  grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
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
