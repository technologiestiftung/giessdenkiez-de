import React, { useState, useEffect } from 'react';
import { PanelWrapper } from '../Panels/PanelWrapper';
import { PanelHeader } from '../Panels/PanelHeader';
import { PanelBody } from '../Panels/PanelBody';
import { PanelIndicator } from '../Panels/PanelIndicator';

const CardAccordion = (p: {
  title: string;
  children: JSX.Element;
  active?: boolean;
}) => {
  const { title, children, active = false } = p;
  const [localActive, toggleActive] = useState(active);

  useEffect(() => {
    toggleActive(active);
  }, [active]);

  const indicator = localActive ? '–' : '+';

  return (
    <PanelWrapper>
      <PanelHeader onClick={() => toggleActive(!localActive)}>
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
