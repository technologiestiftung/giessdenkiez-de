import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import CardHeadline from '../../Card/CardHeadline/';
import CardDescription from '../../Card/CardDescription/';
import CardDescriptionTitle from '../../Card/CardDescriptionTitle/';
import Credits from '../../Credits';
import SocialSharing from '../../SocialSharing';

import content from '../../../assets/content';

const StyledCardDescriptionTitle = styled(CardDescriptionTitle)`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSizeLl};
  line-height: 130%;
`;

const StyledCardDescription = styled(CardDescription)`
  opacity: 0.66;
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
  animation: sweep 0.125s ease-in-out;
  margin-bottom: 10px;
`;

const SocialSharingContainer = styled.div`
  padding-top: 15px;
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

const SidebarAbout = p => {
  const { sidebar } = content;
  const { about } = sidebar;
  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map((item, i) => (
        <PanelWrapper key={i}>
          <StyledCardDescriptionTitle>{item.title}</StyledCardDescriptionTitle>
          <StyledCardDescription
            dangerouslySetInnerHTML={createMarkup(item.description)}
          ></StyledCardDescription>
        </PanelWrapper>
      ))}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <SocialSharingContainer>
        <SocialSharing />
      </SocialSharingContainer>
    </>
  );
};

export default SidebarAbout;
