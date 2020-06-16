// import React from 'react';
import styled from 'styled-components';

export default styled.span`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  line-height: 150%;
  width: 100%;
  transition: ${p => p.theme.transition};

  a {
    color: ${p => p.theme.colorTextDark};
    &:hover {
      opacity: 0.5;
      transition: ${p => p.theme.transition};
    }
  }
`;
