import React, { useState } from 'react';
import styled from 'styled-components';


const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelBody = styled.div`
  display: ${p => p.active ? 'flex' : 'none' };
  animation: sweep .125s ease-in-out;
`;

const PanelIndicator = styled.span`
  border: 1px solid;
  width: 28px;
  justify-content: center;
  height: 28px;
  align-items: center;
  display: flex;
  border-radius: 100px;
  opacity: 1;
  cursor: pointer;
  transition: all .125s ease-in-out;

  :hover {
    opactiy: .5;
    transition: all .125s ease-in-out;
  }
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 10px;
  animation: sweep .125s ease-in-out;
  margin-bottom: 10px;
`


const CardAccordion = p => {
  const [active, toggleActive] = useState(false)
  const { title, children } = p;

  const indicator = active ? '–' : '+';

  return (
    <PanelWrapper>
      <PanelHeader>
        {title}
        <PanelIndicator onClick={() => toggleActive(!active)}>{indicator}</PanelIndicator>
      </PanelHeader>
      <PanelBody active={active}>
        {children}
      </PanelBody>
    </PanelWrapper>
  )
}

export default CardAccordion;