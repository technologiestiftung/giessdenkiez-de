import React from 'react';
import styled from 'styled-components';

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

const StyledParargraph = styled.p`
  font-size: ${p => p.theme.fontSizeLl};
  line-height: ${p => p.theme.lineHeightBody};
  font-weight: regular;
  margin: 0;
`;

const OverlayDescription = p => {
  const { content } = p;

  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <Wrapper>
      {content.map((col, i) => {
        return (
          <StyledParargraph
            dangerouslySetInnerHTML={createMarkup(col)}
            key={`Overlay-description-${i}`}
          ></StyledParargraph>
        );
      })}
    </Wrapper>
  );
};

export default OverlayDescription;
