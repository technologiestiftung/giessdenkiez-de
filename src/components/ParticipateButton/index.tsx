import styled from 'styled-components';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../state/unistore-hooks';
import SmallParagraph from '../SmallParagraph';

const Container = styled(SmallParagraph)`
  padding-top: 10px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  opacity: 1;
  transition: opacity 200ms ease-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const ParticipateButton: FC = () => {
  const { openOverlay } = useActions();
  const history = useHistory();

  return (
    <Container
      onClick={() => {
        openOverlay();
        history.push('/');
      }}
    >
      Wie kann ich mitmachen?
    </Container>
  );
};
