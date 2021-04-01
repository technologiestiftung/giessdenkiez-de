import React, { FC } from 'react';
import styled from 'styled-components';
import Paragraph from '../../Paragraph';

const StyledParargraph = styled(Paragraph)`
  font-size: ${p => p.theme.fontSizeLl};
  line-height: ${p => p.theme.lineHeightBody};
  margin: 0;
`;

const OverlayParagraph: FC = ({ children }) => (
  <StyledParargraph>{children}</StyledParargraph>
);

export default OverlayParagraph;
