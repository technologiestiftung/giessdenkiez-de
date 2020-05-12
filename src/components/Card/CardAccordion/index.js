import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PanelHeader = styled.div`
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
`;

const PanelBody = styled.div`
  display: ${p => (p.active ? 'flex' : 'none')};
  animation: sweep 0.125s ease-in-out;
  width: 100%;
`;

const PanelIndicator = styled.span`
  width: 28px;
  justify-content: center;
  height: 28px;
  align-items: center;
  display: flex;
  border-radius: 100px;
  opacity: 1;
  cursor: pointer;
  transition: all 0.125s ease-in-out;

  &:hover {
    opactiy: 0.5;
    transition: all 0.125s ease-in-out;
  }
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 10px;
  animation: sweep 0.125s ease-in-out;
  margin-bottom: 10px;
`;

const CardAccordion = p => {
  const { title, children, active = false } = p;
  const [localActive, toggleActive] = useState(active);

  useEffect(() => {
    toggleActive(active);
  }, [active]);

  const indicator = localActive ? '–' : '+';

  return (
    <PanelWrapper>
      <PanelHeader>
        {title}
        <PanelIndicator onClick={() => toggleActive(!localActive)}>
          {indicator}
        </PanelIndicator>
      </PanelHeader>
      <PanelBody active={localActive}>{children}</PanelBody>
    </PanelWrapper>
  );
};

export default CardAccordion;
