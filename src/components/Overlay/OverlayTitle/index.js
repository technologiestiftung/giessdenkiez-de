import React from 'react';
import styled from 'styled-components';

const StyledOverlayTitle = styled.h2`
  font-size: ${p => p.theme.fontSizeXxl};
  font-weight: normal;
  line-height: ${p => p.theme.lineHeightHeadline};
  margin: 0px 0 20px 40px;

  b {
    font-weight: bold;
  }

  span {
    color: ${p => p.theme.colorPrimary};
  }
`;

const OverlayTitle = p => {
  const {content} = p;
  return (
    <StyledOverlayTitle dangerouslySetInnerHTML={{ __html: `${content}` }}/>
  )
};

export default OverlayTitle;