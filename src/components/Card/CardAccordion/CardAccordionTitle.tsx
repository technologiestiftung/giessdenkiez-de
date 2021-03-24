import React, { FC } from 'react';
import styled from 'styled-components';

const PanelTitle = styled.span`
  height: fit-content;
  display: flex;
  align-items: center;
  div {
    margin-left: 10px;
  }
`;

const CardAccordionTitle: FC = ({ children }) => (
  <PanelTitle>{children}</PanelTitle>
);

export default CardAccordionTitle;
