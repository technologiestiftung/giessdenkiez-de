import React, { FC } from 'react';
import styled from 'styled-components';

const StyledParargraph = styled.div`
  font-size: ${p => p.theme.fontSizeL};
  line-height: ${p => p.theme.lineHeightBody};
  opacity: 0.8;
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

const OverlayParagraph: FC<{ content: string }> = ({ content }) => {
  const createMarkup = (content: string) => {
    return { __html: content };
  };

  return <StyledParargraph dangerouslySetInnerHTML={createMarkup(content)} />;
};

export default OverlayParagraph;
