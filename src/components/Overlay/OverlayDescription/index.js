import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0 40px;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
`;

const StyledParargraph = styled.p`
  font-size: ${p => p.theme.fontSizeL};
  line-height: ${p => p.theme.lineHeightBody};
  font-weight: regular;
  margin: 0;
`;

const OverlayDescription = p => {
  const { content } = p;

  return (
    <Wrapper>
      {content.map((col,i) => {
        return (
          <StyledParargraph key={`Overlay-description-${i}`}>
            {col}
          </StyledParargraph>
        )
      })}
    </Wrapper>
  );
}

export default OverlayDescription;

