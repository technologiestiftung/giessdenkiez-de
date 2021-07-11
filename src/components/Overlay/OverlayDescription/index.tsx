import React, { FC } from 'react';
import styled from 'styled-components';
import OverlayParagraph from '../OverlayParagraph';

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0 40px;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    gap: 0rem;
    grid-template-columns: 1fr;
  }
`;

const OverlayDescription: FC<{ content: string[] }> = ({ content }) => (
  <Wrapper>
    {content.map((col, i) => (
      <OverlayParagraph key={`Overlay-description-${i}`}>
        {col}
      </OverlayParagraph>
    ))}
  </Wrapper>
);

export default OverlayDescription;
