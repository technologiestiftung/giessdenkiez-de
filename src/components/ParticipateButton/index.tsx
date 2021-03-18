import styled from 'styled-components';
import React, { FC } from 'react';
import CardDescription from '../Card/CardDescription';
import { useActions } from '../../state/unistore-hooks';
import Actions from '../../state/Actions';

const StyledCardDescription = styled(CardDescription)`
  display: block;
  opacity: 0.66;
  text-decoration: underline;
  padding-top: 10px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  &:hover {
    opacity: 0.5;
  }
`;

export const ParticipateButton: FC = () => {
  const { openOverlay } = useActions(Actions);

  return (
    <StyledCardDescription onClick={openOverlay}>
      Wie kann ich mitmachen?
    </StyledCardDescription>
  );
};
