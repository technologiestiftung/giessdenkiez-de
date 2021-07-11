import React, { FC } from 'react';

import SidebarTitle from '../SidebarTitle/';
import SocialSharing from '../../SocialSharing';
import OpenSourceNote from '../../OpenSource';
import content from '../../../assets/content';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';

const SidebarAbout: FC = () => {
  const { sidebar } = content;
  const { about } = sidebar;
  return (
    <>
      <SidebarTitle>Weitere Infos</SidebarTitle>
      {about.map(item => (
        <ExpandablePanel isExpanded title={item.title} key={item.title}>
          <SmallParagraph>{item.description}</SmallParagraph>
        </ExpandablePanel>
      ))}

      <SidebarTitle>{content.faq.title}</SidebarTitle>
      <SmallParagraph>{content.faq.description}</SmallParagraph>
      {content.faq.qa.map(item => (
        <ExpandablePanel key={item.question} title={item.question}>
          <SmallParagraph>{item.answer}</SmallParagraph>
        </ExpandablePanel>
      ))}
      <SocialSharing />
      <OpenSourceNote />
    </>
  );
};

export default SidebarAbout;
