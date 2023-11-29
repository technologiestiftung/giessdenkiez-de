import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from '../../Icons';
import { CollaborationItem } from '../../../assets/content';
import SmallParagraph from '../../SmallParagraph';
import { SlackButton } from '../../SlackButton';

const StyledTileWrapper = styled.div`
  display: flex;
  align-items: flex-start;

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

const OverlayTile: FC<{ collaborationItem: CollaborationItem }> = ({
  collaborationItem,
}) => {
  return (
    <StyledTileWrapper>
      <Icon iconType={collaborationItem.icon} />
      <StyledContentWrapper>
        <StyledTileTitle>{collaborationItem.title}</StyledTileTitle>
        <SmallParagraph>{collaborationItem.description}</SmallParagraph>
        {collaborationItem.showSlackButton && <SlackButton />}
      </StyledContentWrapper>
    </StyledTileWrapper>
  );
};

export default OverlayTile;
