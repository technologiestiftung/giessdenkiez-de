import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';
import CardDescriptionTitle from '../../Card/CardDescriptionTitle/';

import content from "../../../assets/content";

const StyledCardDescriptionTitle = styled(CardDescriptionTitle)`
  margin-bottom: 5px;
`;

const StyledCardDescription = styled(CardDescription)`
  opacity: 1;
`;

const StyledParagraph = styled.p`
  width: 300px;
  line-height: 150%;
  margin-top: 0;
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding-bottom: 10px;
  animation: sweep .125s ease-in-out;
  margin-bottom: 10px;
`

const SidebarAbout = p => {
  const { sidebar } = content;
  const { about } = sidebar;
  function createMarkup(content) { return {__html: content}; };
  return (
    <>
      <SidebarTitle>Weitere Informationen</SidebarTitle>
      {about.map(item => (
        <PanelWrapper>
          <StyledCardDescriptionTitle>{item.title}</StyledCardDescriptionTitle>
          <StyledCardDescription dangerouslySetInnerHTML={createMarkup(item.description)}></StyledCardDescription>
        </PanelWrapper>
      ))}
    </>
  )
}

export default SidebarAbout;