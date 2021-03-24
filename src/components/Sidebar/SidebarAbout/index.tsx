import React, { FC } from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import Credits from '../../Credits';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';

const CreditsContainer = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    position: relative;
  }

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

const SidebarAbout: FC = () => {
  const { sidebar } = content;
  const { about } = sidebar;
  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map(item => (
        <ExpandablePanel isExpanded title={item.title} key={item.title}>
          <SmallParagraph
            dangerouslySetInnerHTML={createMarkup(item.description)}
          ></SmallParagraph>
        </ExpandablePanel>
      ))}

      <SidebarTitle>{content.faq.title}</SidebarTitle>
      <SmallParagraph>{content.faq.description}</SmallParagraph>
      {/* Meh.
      Make some room since the element above is an span and it does not allow to addd padding */}
      <div style={{ paddingBottom: '1rem' }}></div>
      {content.faq.qa.map(item => (
        <ExpandablePanel key={item.question} title={item.question}>
          <SmallParagraph
            dangerouslySetInnerHTML={{ __html: item.answer }}
          ></SmallParagraph>
        </ExpandablePanel>
      ))}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <SocialSharing />
      <OpenSourceNote />
    </>
  );
};

export default SidebarAbout;
