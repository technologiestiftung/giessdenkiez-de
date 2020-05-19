import React from 'react';
import styled from 'styled-components';

const StyledOverlayTitle = styled.h2`
  font-size: ${p => {
    switch (p.size) {
      case 'xxl':
        return p.theme.fontSizeXxl;
      case 'xl':
        return p.theme.fontSizeXl;
      case 'large':
        return p.theme.fontSizeXxl;

      case 'medium':
        return p.theme.fontSizeM;
      case 'small':
        return p.theme.fontSizeS;
      default: {
        return p.theme.fontSizeXl;
      }
    }
  }};
  font-weight: normal;
  line-height: ${p => p.theme.lineHeightHeadline};
  margin: 0px 40px 20px 40px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    font-size: ${p => p.theme.fontSizeXl};
  }

  b {
    font-weight: bold;
  }

  span {
    color: ${p => p.theme.colorPrimary};
  }
`;

const OverlayTitle = p => {
  const { content, size } = p;
  return (
    <StyledOverlayTitle
      size={size}
      dangerouslySetInnerHTML={{ __html: `${content}` }}
    />
  );
};

export default OverlayTitle;
