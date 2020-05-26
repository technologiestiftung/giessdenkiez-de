import React from 'react';
import styled from 'styled-components';

import SidebarTitle from '../SidebarTitle/';
import SidebarMarkup from '../SidebarMarkup';
import Credits from '../../Credits';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';

import content from '../../../assets/content';

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
  const { sidebar: { about } } = content;
  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map((item, i) => <SidebarMarkup item={item} key={i} />)}
      <CreditsContainer>
        <Credits />
      </CreditsContainer>
      <SocialSharingContainer>
        <SocialSharing />
      </SocialSharingContainer>
      <OpenSourceNote />
    </>
  );
};

export default SidebarAbout;
