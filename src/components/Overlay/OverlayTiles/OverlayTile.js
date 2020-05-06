import React from 'react';
import styled from 'styled-components';

import OverlayParagraph from '../OverlayParagraph/';
import OverlayIcon from '../OverlayIcon/';

const StyledTileWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    flex-direction: column;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const StyledTileTitle = styled.h2`
  font-size: ${p => p.theme.fontSizeL};
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 0px;
`;

const OverlayTile = p => {
  const {content} = p;
  return (
    <StyledTileWrapper>
      <OverlayIcon icon={content.icon}/>
      <StyledContentWrapper>
        <StyledTileTitle>{content.title}</StyledTileTitle>
        <OverlayParagraph content={content.content} />
      </StyledContentWrapper>
    </StyledTileWrapper>
  )
}

export default OverlayTile