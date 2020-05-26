import React from 'react';
import styled from 'styled-components';

import CardDescription from '../../Card/CardDescription/';
import CardDescriptionTitle from '../../Card/CardDescriptionTitle/';

const StyledCardDescriptionTitle = styled(CardDescriptionTitle)`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSizeLl};
  line-height: 130%;
`;

const StyledCardDescription = styled(CardDescription)`
  opacity: 0.66;
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 10px;
  animation: sweep 0.125s ease-in-out;
  margin-bottom: 10px;
`;

const SidebarMarkup = p => {
  const { item: { title, description } } = p;
  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <PanelWrapper>
      <StyledCardDescriptionTitle>{title}</StyledCardDescriptionTitle>
      <StyledCardDescription
        dangerouslySetInnerHTML={createMarkup(description)}
      ></StyledCardDescription>
    </PanelWrapper>
  );
};

export default SidebarMarkup;