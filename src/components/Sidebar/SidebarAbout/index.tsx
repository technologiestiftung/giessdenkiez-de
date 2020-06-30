import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import CardDescription from '../../Card/CardDescription/';
import CardDescriptionTitle from '../../Card/CardDescriptionTitle/';
import Credits from '../../Credits';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import { PanelWrapper } from '../../Card/Panels/PanelWrapper';
import CardAccordion from '../../Card/CardAccordion';

const StyledCardDescriptionTitle = styled(CardDescriptionTitle)`
  margin-bottom: 5px;
  font-size: ${p => p.theme.fontSizeLl};
  line-height: 130%;
`;

const StyledCardDescription = styled(CardDescription)`
  opacity: 0.66;
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

const SidebarAbout = _p => {
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

      <SidebarTitle>{content.faq.title}</SidebarTitle>
      <StyledCardDescription>{content.faq.description}</StyledCardDescription>
      {/* Meh.
      Make some room since the element above is an span and it does not allow to addd padding */}
      <div style={{ paddingBottom: '1rem' }}></div>
      {content.faq.qa.map((item, i) => (
        <CardAccordion key={i} title={item.question}>
          <StyledCardDescription
            dangerouslySetInnerHTML={{ __html: item.answer }}
          ></StyledCardDescription>
        </CardAccordion>
      ))}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <SocialSharingContainer>
        <SocialSharing />
      </SocialSharingContainer>
      <OpenSourceNote />
      {/* <ImprintAndPrivacyCard /> */}
    </>
  );
};

export default SidebarAbout;
