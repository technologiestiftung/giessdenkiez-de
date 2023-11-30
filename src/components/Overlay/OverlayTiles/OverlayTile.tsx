import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from '../../Icons';
import { CollaborationItem } from '../../../assets/content';
import SmallParagraph from '../../SmallParagraph';
import { SlackButton } from '../../SlackButton';
import Paragraph from '../../Paragraph';

const StyledTileWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  font-size: 1rem;
`;

const StyledTileTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const OverlayTile: FC<{ collaborationItem: CollaborationItem }> = ({
  collaborationItem,
}) => {
  return (
    <StyledTileWrapper>
      <Icon iconType={collaborationItem.icon} height={72} />
      <StyledContentWrapper>
        <StyledTileTitle>{collaborationItem.title}</StyledTileTitle>
        <Paragraph>{collaborationItem.description}</Paragraph>
      </StyledContentWrapper>
    </StyledTileWrapper>
  );
};

export default OverlayTile;
