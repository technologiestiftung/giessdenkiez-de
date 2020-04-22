import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';

import content from "../../../assets/content";

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
      <SidebarTitle>Über das Projekt</SidebarTitle>
      {about.map(item => (
        <PanelWrapper>
          <SidebarTitle>{item.title}</SidebarTitle>
          <CardDescription dangerouslySetInnerHTML={createMarkup(item.description)}></CardDescription>
        </PanelWrapper>
      ))}
    </>
  )
}

export default SidebarAbout;