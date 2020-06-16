import React from 'react';
import styled from 'styled-components';

const StyledParargraph = styled.div`
  font-size: ${p => p.theme.fontSizeL};
  line-height: ${p => p.theme.lineHeightBody};
  opactiy: 0.8;
  font-weight: regular;
  margin: 0;

  a {
    color: ${p => p.theme.colorTextDark};
    transition: all 0.125s ease-in-out;
    &:hover {
      opacity: 0.5;
      transition: all 0.125s ease-in-out;
    }
  }
`;

const OverlayParagraph = p => {
  const { content } = p;
  const createMarkup = content => {
    return { __html: content };
  };

  return <StyledParargraph dangerouslySetInnerHTML={createMarkup(content)} />;
};

export default OverlayParagraph;
