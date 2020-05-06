import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';
import CardDescriptionTitle from '../../Card/CardDescriptionTitle/';
import Credits from '../../Credits';

import content from "../../../assets/content";

import logoBerlin from '!file-loader!../../../assets/berlin.svg';

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
`;

const CreditsContainer = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    position: relative;
  }

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

const StyledFoerderlogoContainer = styled.div`
  width: 150px;
  height: auto;
  flex-direction: column;
  display: flex;
  justify-content: end;
  margin-bottom: 10px;

  span {
    margin-bottom: 5px;
    width: fit-content;
    font-size: ${p => p.theme.fontSizeL}
  }
`;

const SidebarAbout = p => {
  const { sidebar } = content;
  const { about } = sidebar;
  function createMarkup(content) { return {__html: content}; };
  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map(item => (
        <PanelWrapper>
          <StyledCardDescriptionTitle>{item.title}</StyledCardDescriptionTitle>
          <StyledCardDescription dangerouslySetInnerHTML={createMarkup(item.description)}></StyledCardDescription>
        </PanelWrapper>
      ))}
      <CreditsContainer>
        <Credits/>
      </CreditsContainer>
      <StyledFoerderlogoContainer>
        <span>Gefördert durch</span>
        <img src={logoBerlin} />
      </StyledFoerderlogoContainer>
    </>
  )
}

export default SidebarAbout;