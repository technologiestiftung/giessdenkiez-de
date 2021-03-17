import styled from 'styled-components';
import React, { FC } from 'react';
import CardDescription from '../Card/CardDescription';
import store from '../../state/Store';

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

export const ParticipateButton: FC = () => (
  <StyledCardDescription onClick={() => store.setState({ overlay: true })}>
    Wie kann ich mitmachen?
  </StyledCardDescription>
);
