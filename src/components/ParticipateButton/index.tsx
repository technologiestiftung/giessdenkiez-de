import styled from 'styled-components';
import React, { FC } from 'react';
import { useActions } from '../../state/unistore-hooks';
import SmallParagraph from '../SmallParagraph';
import { useRouter } from 'next/router';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

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
  const { participateButton } = useLocalizedContent().sidebar;
  const { openOverlay } = useActions();
  const { push } = useRouter();

  return (
    <Container
      onClick={() => {
        openOverlay();
        void push('/');
      }}
    >
      {participateButton}
    </Container>
  );
};
