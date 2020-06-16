import React from 'react';
import styled from 'styled-components';

const PanelTitle = styled.span`
  height: fit-content;
  display: flex;
  align-items: center;
  div {
    margin-left: 10px;
  }
`;

const CardAccordionTitle = (p: { children: any }) => {
  const { children } = p;
  return <PanelTitle>{children}</PanelTitle>;
};

export default CardAccordionTitle;
