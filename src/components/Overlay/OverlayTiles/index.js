import React from 'react';
import styled from 'styled-components';

import OverlayTile from './OverlayTile';

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0 40px;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
`;

// const StyledParargraph = styled.p`
//   font-size: ${p => p.theme.fontSizeL};
//   line-height: ${p => p.theme.lineHeightBody};
//   font-weight: regular;
//   margin: 0;
// `;

const OverlayTiles = p => {
  const { content } = p;

  return (
    <Wrapper>
      {content.map((col, i) => {
        return (
          <OverlayTile key={`Overlay-tile-${i}`} content={col}></OverlayTile>
        );
      })}
    </Wrapper>
  );
};

export default OverlayTiles;
