import React, { FC } from 'react';
import styled from 'styled-components';

import OverlayTiles from '../OverlayTiles/';
import OverlayTitle from '../OverlayTitle/';
import content from '../../../assets/content';

const StyledBottom = styled.div`
  opacity: 1;
  height: auto;
  width: 100%;
  background-color: #f7f7f7;
  padding: 40px 0;
`;

const OverlayBottom: FC = () => {
  const { collaborate } = content;

  return (
    <StyledBottom>
      <OverlayTitle title={collaborate.title} />
      <OverlayTiles tiles={collaborate.tiles} />
    </StyledBottom>
  );
};

export default OverlayBottom;
