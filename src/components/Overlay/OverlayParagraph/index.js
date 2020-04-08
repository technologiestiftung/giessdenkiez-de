import React from 'react';
import styled from 'styled-components';

const StyledParargraph = styled.p`
  font-size: ${p => p.theme.fontSizeL};
  line-height: ${p => p.theme.lineHeightBody};
  opactiy: .8;
  font-weight: regular;
  margin: 0;
`;

export default StyledParargraph;