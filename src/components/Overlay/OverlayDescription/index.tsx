import React, { FC } from 'react';
import styled from 'styled-components';
import OverlayParagraph from '../OverlayParagraph';

const Wrapper = styled.div`
  margin: -10px 40px 10px;
  max-width: 100%;
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
